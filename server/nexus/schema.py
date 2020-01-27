import graphene
from graphene_django.debug import DjangoDebug

from gaming import schema as gaming_schema


class Query(gaming_schema.Query, graphene.ObjectType):
    debug = graphene.Field(DjangoDebug, name="_debug")


schema = graphene.Schema(query=Query)