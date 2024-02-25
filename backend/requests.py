from typing import Dict, Any
from schemas import Item, GET_Item
from db import async_session, ITEMS
from sqlalchemy import select


class ItemRequests:
    @classmethod
    async def add_item(cls, data: Item):
        async with async_session() as session:
            task_dict = data.model_dump()
            item = ITEMS(**task_dict)
            session.add(item)
            await session.flush()
            await session.commit()
            return item.id

    @classmethod
    async def find_item(cls, data: GET_Item):
        async with async_session() as session:
            item_dict = data.model_dump()
            filters = {key: value for key, value in item_dict.items() if value is not None}
            query = select(ITEMS).filter_by(**filters)
            result = await session.execute(query)
            item = result.scalars().all()
            return item

    # @classmethod
    # async def all_items(cls):
    #     async with async_session() as session:
    #         query = select(ITEMS)
    #         result = await session.execute(query)
    #         item = result.scalars().all()
    #         return item