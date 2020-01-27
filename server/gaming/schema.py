from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene import Node
from . import models


class BaseMeta:
    filter_fields = ()
    interfaces = (Node,)


class Game(DjangoObjectType):
    class Meta(BaseMeta):
        model = models.Game
        filter_fields = {
            'name': ['exact']
        }


class Item(DjangoObjectType):
    class Meta(BaseMeta):
        model = models.Item


class Recipe(DjangoObjectType):
    class Meta(BaseMeta):
        model = models.Recipe


class Station(DjangoObjectType):
    class Meta(BaseMeta):
        model = models.Station


class Query(object):
    game = Node.Field(Game)
    all_games = DjangoFilterConnectionField(Game)

    item = Node.Field(Item)
    all_items = DjangoFilterConnectionField(Item)

    recipe = Node.Field(Recipe)
    all_recipes = DjangoFilterConnectionField(Recipe)

    station = Node.Field(Station)
    all_stations = DjangoFilterConnectionField(Station)
