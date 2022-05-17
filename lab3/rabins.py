import algos as al
import files as f
import math as m
from pprint import pprint
import gmpy2

# checking input keys
# return error message
def check_keys(p, q, b):
    if p < 0 or q < 0 or b < 0:
        raise ValueError("Negative keys")

    if (not gmpy2.is_prime(p)) or (not gmpy2.is_prime(q)):
        raise ValueError("Not prime p or q")

    # checking if both keys are modular equal to 3
    if p % 4 != 3 and q % 4 != 3:
        raise ValueError("Modulo of p or q not equal 3")

    # checking for correct b value
    if p * q < b:
        raise ValueError("b is greater than p * q")

    if p * q < 209: #changed from 256
        raise ValueError("Small values of p and q")

    return True


# p, q - close keys
# n, b - open keys
# Getting encrypt bytes form initial bytes
def get_encrypt_data_rabins(in_bytes_arr, p, q, b):
    n = p * q

    out_bytes_arr = []
    for byte in in_bytes_arr:
        out_bytes_arr.append((byte * (byte + b)) % n)

    return out_bytes_arr


# Getting decrypted bytes from encrypted bytes
# TODO: think about modulo
def get_decrypt_data_rabins(enc_bytes_arr, p, q, b):
    n = p * q
    discrs_arr = []
    m_p = []
    m_q = []
    # calculating discriminant of all bytes (encrypted)
    for byte in enc_bytes_arr:
        discr = (al.fast_pow(b, 2) + 4 * byte) % n

        discrs_arr.append(discr)

        # m_p.append(al.fast_pow(discr, ((p + 1) // 4)) % p)
        # m_q.append(al.fast_pow(discr, ((q + 1) // 4)) % q)
        m_p.append(int(gmpy2.powmod(discr, (p + 1) // 4, p)))
        m_q.append(int(gmpy2.powmod(discr, (q + 1) // 4, q)))

    # finding coefficient by extended Euclid algorithm
    y_p, y_q = al.extended_Euclid(p, q)

    print(y_p, y_q)
    data_len = len(m_p)
    decr_arr = [[0 for y in range(4)] for x in range(data_len)]
    for i in range(data_len):
        # decr_arr[i][0] = int(m.fmod((y_p * p * m_q[i] + y_q * q * m_p[i]), n))
        decr_arr[i][0] = int(gmpy2.mod((y_p * p * m_q[i] + y_q * q * m_p[i]), n))
        # decr_arr[i][0] = (y_p * p * m_q[i] + y_q * q * m_p[i]) % n
        decr_arr[i][1] = n - decr_arr[i][0]
        # decr_arr[i][2] = int(m.fmod((y_p * p * m_q[i] - y_q * q * m_p[i]), n))
        decr_arr[i][2] = int(gmpy2.mod((y_p * p * m_q[i] - y_q * q * m_p[i]), n))
        # decr_arr[i][2] = (y_p * p * m_q[i] - y_q * q * m_p[i]) % n
        decr_arr[i][3] = n - decr_arr[i][2]

    #pprint(decr_arr)

    decr_arr_new = [[0 for y in range(4)] for x in range(data_len)]
    final_res = []
    for i in range(len(decr_arr)):
        is_find = False
        for j in range(len(decr_arr[i])):
            if (decr_arr[i][j] - b) % 2 == 0:
                # decr_arr_new[i][j] = int(m.fmod(((decr_arr[i][j] - b) / 2), n))
                decr_arr_new[i][j] = int(gmpy2.fmod(int((decr_arr[i][j] - b) / 2), n))
                # decr_arr_new[i][j] = int(((decr_arr[i][j] - b) / 2) % n)
            else:
                # decr_arr_new[i][j] = int(m.fmod(((decr_arr[i][j] + n - b) / 2), n))
                decr_arr_new[i][j] = int(gmpy2.fmod(int((decr_arr[i][j] + n - b) / 2), n))
                # decr_arr_new[i][j] = int(((decr_arr[i][j] + n - b) / 2) % n)

            # Finding elements in range 0, 255
            if (0 <= decr_arr_new[i][j] <= 255) and (not is_find):
                final_res.append(decr_arr_new[i][j])
                is_find = True

    pprint(decr_arr_new)
    print(final_res)

    return final_res


# Encrypting data by filepath and keys
def enrypt_rabins(in_filepath, out_filepath, p, q, b):
    try:
        bytes_content_arr = f.read_binary_file(in_filepath)
        out_bytes_arr = get_encrypt_data_rabins(bytes_content_arr, p, q, b)

        f.write_binary_file(out_filepath, out_bytes_arr)

        return out_bytes_arr
    except:
        raise ValueError("Error in encrypting")


def decrypt_rabins(in_filepath, out_filepath, p, q, b):
    try:
        bytes_content_arr = f.read_ecnrypted_file(in_filepath)
        out_bytes_arr = get_decrypt_data_rabins(bytes_content_arr, p, q, b)

        f.write_decrypted_file(out_filepath, out_bytes_arr)

        return out_bytes_arr
    except:
        raise ValueError("Error in decrypting")
