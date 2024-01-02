FROM python:3.11.7-alpine3.18
WORKDIR /api

COPY ./api/requirements.txt /api/requirements.txt

RUN \
 apk add --no-cache postgresql-libs && \
 apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
 pip install --no-cache-dir --upgrade -r /api/requirements.txt && \
 apk --purge del .build-deps

COPY ./api /api
CMD ./start_api.sh