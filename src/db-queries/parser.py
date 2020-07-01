import sys as sys
from moz_sql_parser import parse
import json

try:
    result = json.dumps(parse(sys.argv[1]))
    print(result, file=sys.stdout)
except:
    print("SQL parser error: invalid query", file=sys.stderr)
