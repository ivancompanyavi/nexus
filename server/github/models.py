from requests.auth import HTTPBasicAuth
import requests

from nexus.settings import GITHUB_TOKEN, GITHUB_USERNAME


def req(body):
    return requests.post(
        'https://api.github.com/graphql',
        auth=HTTPBasicAuth(GITHUB_USERNAME, GITHUB_TOKEN),
        json={'query': body})\
        .json()


class GithubRepository(object):
    def __init__(self, name):
        self.name = name


class Github(object):
    @staticmethod
    def get_repositories():
        body = """{
            viewer {
                repositories(first:5) {
                    nodes {
                        name
                    }
                }
            }
        }
        """
        res = req(body)

        return [GithubRepository(**e['node']) for e in res['data']['viewer']['repositories']['edges']]


def get_user():
    body = "{ \"query\": \"query { viewer { login }}\"}"
    return req(body)
