

def check_at_least_one_tag(essential_tags, logged_bug_tags):
    for tag in essential_tags:
        if tag in logged_bug_tags:
            return True
    return False


def special_marking_detected(bug, logged_bug_tags):
    match bug.name:
        case "bugEditCategoryRoute":
            essential_additional_tags = ["Bug declaration /add/category", "Bug declaration /delete/category"]
            return check_at_least_one_tag(essential_additional_tags, logged_bug_tags)
        case "bugAddCategoryRoute":
            essential_additional_tags = ["Bug declaration /edit/category", "Bug declaration /delete/category"]
            return check_at_least_one_tag(essential_additional_tags, logged_bug_tags)
        case "bugDeleteCategoryRoute":
            essential_additional_tags = ["Bug declaration /add/category", "Bug declaration /edit/category"]
            return check_at_least_one_tag(essential_additional_tags, logged_bug_tags)
        case "bug.truncate.orders.number":
            essential_additional_tags = ["Bug declaration /order-history"]
            return check_at_least_one_tag(essential_additional_tags, logged_bug_tags)
        case "bug.truncate.roles.number":
            essential_additional_tags = ["Bug declaration /users/edit"]
            return check_at_least_one_tag(essential_additional_tags, logged_bug_tags)
        case "bugReplaceProductInCart":
            essential_additional_tags = ["Bug declaration /cart-details"]
            return check_at_least_one_tag(essential_additional_tags, logged_bug_tags)
        case _:
            return True

