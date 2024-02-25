from fastapi import FastAPI
from contextlib import asynccontextmanager
from route import router as items_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # await db.delete_database()
    # await db.create_database()
    print('Запущено')
    yield
    print('Выключение')


app = FastAPI(lifespan=lifespan)
app.include_router(items_router)