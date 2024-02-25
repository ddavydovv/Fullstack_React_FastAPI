from typing import Annotated
from fastapi import APIRouter, Depends
from schemas import Item, GET_Item
from requests import ItemRequests

router = APIRouter(
    prefix='/items',
    tags=['Items']
)


@router.post('/add')
async def post_items(item: Annotated[Item, Depends()]):
    result = await ItemRequests.add_item(item)
    return {'ok': True, 'data': result}


@router.get('/get')
async def get_items(item: Annotated[GET_Item, Depends()]):
    result = await ItemRequests.find_item(item)
    if len(result) == 0:
        result = 'Not found'
    return {'ok': True, 'data': result}


# @router.get('/all')
# async def get_all_items():
#     result = await ItemRequests.all_items()
#     return {'ok': True, 'data': result}