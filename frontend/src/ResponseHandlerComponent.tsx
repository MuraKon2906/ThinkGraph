interface Props {
  prompt: string | null;
  material: File | null;
}

function ResponseHandlerComponent(props: Props) {
  return (
    <div className="flex justify-end p-4">
      <div className="border rounded-md p-3 max-w-md">
        <h1>Prompt ::: {props.prompt}</h1>

        {props.material && (
          <h1>File Name ::: {props.material.name}</h1>
        )}
      </div>
    </div>
  );
}

export default ResponseHandlerComponent;
