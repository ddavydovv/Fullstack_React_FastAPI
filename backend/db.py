from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy import Column, String, BigInteger, Integer
from sqlalchemy.orm import declarative_base

DATABASE_URL = "postgresql+asyncpg://postgres:postgres@localhost:5432/async_db"

async_engine = create_async_engine(DATABASE_URL, echo=True, future=True)
async_session = async_sessionmaker(async_engine, class_=AsyncSession, expire_on_commit=False, autoflush=False)
Base = declarative_base()


class ITEMS(Base):
    __tablename__ = 'items'

    id = Column(Integer, primary_key=True, index=True)
    brand_name = Column(String, unique=False, index=True)
    sizes_item = Column(Integer, unique=False, index=True)
    cost_item = Column(Integer, unique=False, index=True)
    caption_item = Column(String, unique=False, index=True)


async def create_database():
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def delete_database():
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)