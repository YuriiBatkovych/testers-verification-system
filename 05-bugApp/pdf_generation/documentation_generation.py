import pdfkit
import jinja2

from environment_config.path_reader import get_path
from properties_management.manage_bugs import get_all_defaults_map


def generate_pdf_documentation():
    path_to_wkhtmltopdf = get_path("path_to_wkhtmltopdf")
    DOCUMENTATION_TEMPLATE_FOLDER = get_path("DOCUMENTATION_TEMPLATE_FOLDER")
    DOCUMENTATION_CSS_PATH = get_path("DOCUMENTATION_CSS_PATH")

    context = get_all_defaults_map()

    template_loader = jinja2.FileSystemLoader(DOCUMENTATION_TEMPLATE_FOLDER)
    template_env = jinja2.Environment(loader=template_loader)

    doc_template = template_env.get_template("documentation_template.html")
    output_text = doc_template.render(context)

    config = pdfkit.configuration(wkhtmltopdf=path_to_wkhtmltopdf)
    pdfkit.from_string(output_text, 'documentation_test.pdf', configuration=config, css=DOCUMENTATION_CSS_PATH)
