import rabins
import gmpy2


def fast_pow(a, z, n):
    a1 = a
    z1 = z
    x = 1
    i = 0
    while z1 != 0:
        print(f"{i} a={a1} z={z1} x={x}")
        while (z1 % 2) == 0:
            z1 = z1 // 2
            a1 = (a1 * a1) % n

            i += 1
            print(f"{i} a={a1} z={z1} x={x}")

        z1 -= 1
        x = (x * a1) % n
        i += 1

    print(f"{i} a={a1} z={z1} x={x}")

    return x


a = 19
z = 45
n = 5
print(fast_pow(a, z, n))
print(gmpy2.powmod(a, z, n))

p = 11
max_pow = 10
for num in range(1, p):
    print(f"{num}:")
    print(f"{num} ** {max_pow} % {p} = {num ** max_pow % p}")
    for pow in range(1, max_pow):
        print(f"{num} ** {pow} % {p} = {num ** pow % p}")

    print()
