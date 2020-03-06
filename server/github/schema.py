from graphene_django import DjangoObjectType
import graphene
from . import models


class GithubRepository(graphene.ObjectType):
    name = graphene.String(description="Repository name")


class Github(graphene.ObjectType):
    repositories = graphene.List(GithubRepository)

    @staticmethod
    def resolve_repositories(parent, info):
        return models.Github.get_repositories()


class Query(object):
    github = graphene.Field(Github)

    @staticmethod
    def resolve_github(parent, info):
        return Github()