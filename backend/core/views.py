import os
import tempfile
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

from dotenv import load_dotenv 

load_dotenv() 

api_key = os.getenv("API_KEY")


@api_view(["POST"])
def query_view(request):
    prompt   = request.data.get("prompt", "")
    material = request.FILES.get("material")

    if not prompt:
        return Response({"error": "Prompt is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Always pass google_api_key explicitly — never rely on ADC
        embeddings = GoogleGenerativeAIEmbeddings(
            model="models/gemini-embedding-2-preview",
            google_api_key=api_key
        )
        
        llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",
            temperature=0.3,
            google_api_key=api_key,
        )

        if material:
            suffix = os.path.splitext(material.name)[-1]
            with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
                for chunk in material.chunks():
                    tmp.write(chunk)
                tmp.flush()
                tmp_path = tmp.name

            loader   = PyPDFLoader(tmp_path)
            docs     = loader.load()
            splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
            chunks   = splitter.split_documents(docs)
            os.unlink(tmp_path)

            vectorstore = FAISS.from_documents(chunks, embeddings)
            retriever   = vectorstore.as_retriever(search_kwargs={"k": 4})

            rag_prompt = ChatPromptTemplate.from_template("""
You are an expert research analyst. Answer the user's question using ONLY
the context provided below. Format your response in markdown. Use headers,
bullet points and LaTeX math ($$...$$) where appropriate.
If the answer is not in the context, say so clearly.

Context:
{context}

Question: {input}
""")
            chain  = create_retrieval_chain(retriever, create_stuff_documents_chain(llm, rag_prompt))
            result = chain.invoke({"input": prompt})
            answer = result["answer"]

        else:
            result = llm.invoke(prompt)
            answer = result.content

        return Response({"answer": answer})

    except Exception as e:
        import traceback
        traceback.print_exc()
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
