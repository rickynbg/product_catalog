import uvicorn

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, user, car

from decouple import config
 

description = """
API project to test FastAPI. 🚀

## Items

You can **read items**.

## Users

You will be able to:

* **Create users** (_not implemented_).
* **Read users** (_not implemented_).
"""

tags_metadata = [
    {
        "name": "Health",
        "description": "Health check information about this service.",
    },
    {
        "name": "Authorization",
        "description": "Operations with users. The **login** logic is also here.",
    },
    {
        "name": "User",
        "description": "Operations with users. The **set role** logic is also here.",
    },
    {
        "name": "Products",
        "description": "Manage items.",
        "externalDocs": {
            "description": "FastAPI docs",
            "url": "https://fastapi.tiangolo.com/",
        },
    },
]


app = FastAPI(
    title=config('PROJECT_NAME', default='Project'),
    description=description,
    summary="API to users and products manager",
    version=config('PROJECT_VERSION', default='0.1.0'),
    terms_of_service="http://example.com/terms/",
    contact={
        "name": "Ricky Burgos",
        "url": "https://github.com/rickynbg",
        "email": "rickynbg@fakemail.com",
    },
    license_info={
        "name": "Apache 2.0",
        "identifier": "MIT",
    },
    openapi_tags=tags_metadata,
    openapi_url="/v1/openapi.json"
)

origins = [
    "http://localhost",
    "http://localhost:4200",
    "http://127.0.0.1:4200",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/v1/health", tags=["Health"])
async def get_health() -> dict:

    return {
        'Database': 'Status is up',
        'Application:': 'Status is up',
        'Networking': '0.99 ms latency'
}

app.include_router(auth.router, prefix="/v1/auth", tags=["Authorization"])
app.include_router(user.router, prefix="/v1/user", tags=["User"])
app.include_router(car.router, prefix='/v1/products', tags=["Products"])
#app.include_router(veiculos.router, prefix='/api/veiculos',  dependencies=[Depends(depends.get_current_user)])


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080, log_level="info")
