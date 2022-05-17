import pickle
# Module for working with files in binary mode

def read_binary_file(path):
    with open(path, "rb") as f:
        file_content = f.read()

    content_code_list = [char for char in file_content]
    return content_code_list

def read_ecnrypted_file(path):
    with open(path, "rb") as f:
        file_content = pickle.load(f)

    return file_content

def write_binary_file(path, content):
    with open(path, "wb") as f:
        pickle.dump(content, f)
        #bytes_cont = bytes(content)
        #bytes_cont = [bytes(x) for x in content]
        #for byte in content:
        #    f.write(bytes(byte))

def write_decrypted_file(path, content):
    with open(path, "wb") as f:
        f.write(bytes(content))
