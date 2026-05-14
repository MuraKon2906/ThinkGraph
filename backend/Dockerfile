# UV is preinstalled in this image
FROM ghcr.io/astral-sh/uv:python3.12-bookworm

# logs
ENV PYTHONUNBUFFERED=1

WORKDIR /backend


COPY pyproject.toml uv.lock ./ 

# To sync all the dependencies
RUN uv sync

EXPOSE 8000
