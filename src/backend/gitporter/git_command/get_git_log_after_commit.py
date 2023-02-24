import tempfile
import git
import os
import shutil

def get_git_log_after_commit(clone_url: str, last_commit_hash: str) -> str:
    repo_path = tempfile.mktemp(prefix="gitalytics")
    try:
        git_repository = git.Repo.clone_from(
            clone_url,
            to_path=repo_path,
            filter="blob:none",
            no_checkout=True
        )
        log = git_repository.git.log('--shortstat', '--no-merges', '--format=%H;%aI;%an;%ae', f"{last_commit_hash}..HEAD")
    finally:
        if os.path.isdir(repo_path):
            shutil.rmtree(repo_path)
    
    return log
