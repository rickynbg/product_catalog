# Web app with Angular 17 and FastAPI

This is a sample web application to create users and product catalog, set to use HTTPOnly. Don't use it in production!

#### Backend:

- FastAPI version 0.104.1
- SQLAlchemy
- uvicorn

#### Frontend:

- Angular CLI version 17.0.6.
- Material Angular

#### ToDo:

* [ ] Test suite
* [ ] Use refresh token
* [ ] Update and create new products
* [ ] Update users info
* [ ] Roles for users

## Running the Project Locally

> Clone this Repo.
> Set JWT_SECRET_KEY and JWT_REFRESH_SECRET_KEY

```bash
openssl rand -hex 32 # generate KEY
cd product_catalog
docker-composer up -d
```

> Open the development web at localhost:80
