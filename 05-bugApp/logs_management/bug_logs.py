import re

BUG_LOGS_FILE = 'D:/ecommerce-shop/logging/bugs/bugs.log'


def parse_bug_logs():
    file_path = BUG_LOGS_FILE

    bug_tags = []
    with open(file_path, 'r') as file:
        content = file.read()
        matches = re.findall(r'\[\[(.*?)\]\]', content)
        for match in matches:
            if not (match in bug_tags):
                bug_tags.append(match)
    return bug_tags


def mark_detected_bugs(activated_bugs):
    logged_bug_tags = parse_bug_logs()

    for bug in activated_bugs:
        if bug.tag in logged_bug_tags:
            bug.mark_detected()

    return activated_bugs
