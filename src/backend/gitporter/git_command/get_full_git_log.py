import tempfile
import git
import os
import shutil
import re

def get_full_git_log(clone_url: str) -> str|None:
    repo_path = tempfile.mktemp(prefix="gitalytics")
    try: 
        git_repository = git.Repo.clone_from(
                clone_url,
                to_path=repo_path,
                no_checkout=True
            )

        try:
            log = git_repository.git.log('--shortstat', '--no-merges', '--format=%H;%aI;%an;%ae')
        except git.exc.GitCommandError as git_error:
            if type(git_error.stderr) is not str:
                raise git_error
            if re.search(r"fatal: your current branch '.+' does not have any commits yet", git_error.stderr):
                return None
            raise git_error
    finally:
        if os.path.isdir(repo_path):
            shutil.rmtree(repo_path)
    
    return log
