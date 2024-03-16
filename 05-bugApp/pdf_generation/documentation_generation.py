import pdfkit
import jinja2

path_to_wkhtmltopdf = "D:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe"

test_tag = "Yurii test"

context = {'test_tag': test_tag}

template_loader = jinja2.FileSystemLoader('./templates/')
template_env = jinja2.Environment(loader=template_loader)

doc_template = template_env.get_template("documentation_template.html")
output_text = doc_template.render(context)

config = pdfkit.configuration(wkhtmltopdf=path_to_wkhtmltopdf)
pdfkit.from_string(output_text, 'documentation_test.pdf', configuration=config)
