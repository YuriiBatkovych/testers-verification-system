import re

BUG_LOGS_FILE = 'D:/ecommerce-shop/logging/bugs/bugs.log'


def parse_bug_logs():
    file_path = BUG_LOGS_FILE

    strings_in_brackets = []
    with open(file_path, 'r') as file:
        content = file.read()
        matches = re.findall(r'\[\[(.*?)\]\]', content)
        for match in matches:
            if not (match in strings_in_brackets):
                strings_in_brackets.append(match)
    return strings_in_brackets


