import subprocess
print("Starting push...")
result = subprocess.run(["git", "push", "origin", "main"], cwd=r"d:\Downloads\Birthday_2403", capture_output=True)
with open("push_stdout.txt", "wb") as f:
    f.write(result.stdout)
with open("push_stderr.txt", "wb") as f:
    f.write(result.stderr)
print("Finished push, returncode=", result.returncode)
