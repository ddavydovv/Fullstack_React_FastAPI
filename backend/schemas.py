from typing import Optional
from pydantic import BaseModel


class Item(BaseModel):
    brand_name: str
    sizes_item: int
    cost_item: int
    caption_item: str


class Item_id(Item):
    id: int


class GET_Item(BaseModel):
    id: Optional[int] = None
    brand_name: Optional[str] = None
    sizes_item: Optional[int] = None
    cost_item: Optional[int] = None
    caption_item: Optional[str] = None