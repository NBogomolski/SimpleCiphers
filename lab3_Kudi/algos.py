# Module that contains algorithms: Fast power, extended algorithm of Euclid

# power num to power
# Идея возведение результата в квадрат таким образом заменяя многочисленное умножения результата на num
def fast_pow(num, power):
    if power == 0:
        return 1
    if power == -1:
        return 1. / num
    res = fast_pow(num, power // 2)
    res *= res
    if power % 2:
        res *= num

    return res


# Extended Euclid algorithm to find a and b in expression ( a*x1 + b*x2 = gcd(x1, x2) )
def extended_Euclid(num1, num2):
    if num1 == 0:
        return 0, 1
    else:
        x, y = extended_Euclid(num2 % num1, num1)
    return y - (num2 // num1) * x, x

