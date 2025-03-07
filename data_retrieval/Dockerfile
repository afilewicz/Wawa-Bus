FROM python:3.10

WORKDIR /app/

COPY --from=ghcr.io/astral-sh/uv:0.4.15 /uv /bin/uv

ENV PATH="/app/.venv/bin:$PATH"

ENV UV_COMPILE_BYTECODE=1

ENV UV_LINK_MODE=copy

RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --frozen --no-install-project

ENV PYTHONPATH=/app

COPY ./scripts /app/scripts

COPY ./pyproject.toml ./uv.lock /app/

COPY ./data_retrieval /app/data_retrieval

RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync

CMD ["python", "data_retrieval/main.py"]