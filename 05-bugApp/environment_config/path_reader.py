from functools import lru_cache


def is_line_whitespace(line):
    return all(char.isspace() for char in line)


@lru_cache(maxsize=15)
def get_path(path_name):
    path_value = ''

    with open('./paths', 'r') as file:
        for line in file:
            if not is_line_whitespace(line):
                key, value = line.strip().split('=')
                if key == path_name:
                    path_value = value
                    break

    return path_value
