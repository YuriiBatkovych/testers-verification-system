class DefaultConfig:

    def __init__(self, tag, value):
        self.tag = tag
        self.value = value

    def __repr__(self):
        return f"Default config tag: {self.name}, value: {self.value}"