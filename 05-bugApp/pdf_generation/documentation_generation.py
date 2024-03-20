import pdfkit
import jinja2

path_to_wkhtmltopdf = "D:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe"

DOCUMENTATION_TEMPLATE_FOLDER = './pdf_generation/templates/'
DOCUMENTATION_CSS_PATH = './pdf_generation/css/documentation.css'


def generate_pdf_documentation():
    test_tag = "Yurii test"
    context = {'test_tag': test_tag}

    template_loader = jinja2.FileSystemLoader(DOCUMENTATION_TEMPLATE_FOLDER)
    template_env = jinja2.Environment(loader=template_loader)

    doc_template = template_env.get_template("documentation_template.html")
    output_text = doc_template.render(context)

    config = pdfkit.configuration(wkhtmltopdf=path_to_wkhtmltopdf)
    pdfkit.from_string(output_text, 'documentation_test.pdf', configuration=config, css=DOCUMENTATION_CSS_PATH)
