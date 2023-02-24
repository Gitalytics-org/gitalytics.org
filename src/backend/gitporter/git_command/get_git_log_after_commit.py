import tempfile
import git
import os
import shutil
import re

def get_git_log_after_commit(clone_url: str, last_commit_hash: str|None) -> str:
    repo_path = tempfile.mktemp(prefix="gitalytics")
    try:
        git_repository = git.Repo.clone_from(
            clone_url,
            to_path=repo_path,
            filter="blob:none",
            no_checkout=True
        )
        try: 
            if last_commit_hash is None:
                log: str = git_repository.git.log('--shortstat', '--no-merges', '--format=%H;%aI;%an;%ae')
            else:
                log: str = git_repository.git.log('--shortstat', '--no-merges', '--format=%H;%aI;%an;%ae', f"{last_commit_hash}..HEAD")
            if log.strip() == "":
                return None
            return log
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
