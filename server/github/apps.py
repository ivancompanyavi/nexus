from django.apps import AppConfig


class GithubConfig(AppConfig):
    name = 'github'

    def ready(self):
        import os
        from pathlib import Path
        from nexus.settings import GITHUB_REPOSITORIES
        from git import Repo

        print('entra')
        repos_path = os.path.join(os.getcwd(), '.repositories')

        Path(repos_path).mkdir(parents=True, exist_ok=True)

        for repository in GITHUB_REPOSITORIES:
            cloned_repo = Repo.clone_from(repository['URL'], os.path.join(repos_path, repository['NAME']))
