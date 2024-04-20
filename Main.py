import subprocess

def check_node_installed():
    try:
        subprocess.run(['node', '--version'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
        print("Node.js is installed.")
    except subprocess.CalledProcessError:
        print("Node.js is not installed. Please install Node.js to run the scripts.")
        exit(1)

def run_script(script_name):
    process = subprocess.Popen(['node', script_name], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

    # Print output and errors as they appear
    for line in process.stdout:
        print(line, end='')  # end='' avoids additional newlines

    # Wait for the process to finish and get the exit status
    return_code = process.wait()
    if return_code:
        errors = process.stderr.read()
        print(f"Errors from {script_name}: {errors}")

def run_script2(script_name):
    # Run the script indefinitely and let it take over the console
    subprocess.call(['node', script_name])

if __name__ == "__main__":
    check_node_installed()  # Ensure Node.js is available
    run_script(r'C:\Users\Afro\Projects\JavascriptLMstudioTemplate\WebScraper\scraper.js')
    run_script2(r'C:\Users\Afro\Projects\JavascriptLMstudioTemplate\LMstudioConnection\LocalModel.js')