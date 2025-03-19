import json
import requests

print("----------")
requests.packages.urllib3.disable_warnings()
api_url="http://127.0.0.1:58000/api/v1/ticket"
headers={
    "content-type": "application/json"
}
body_json={
    "username": "admin",
    "password": "cisco"
}
resp=requests.post(api_url, json.dumps(body_json), headers=headers, verify=False)
print("Ticket request status ", resp.status_code)
response_json=resp.json()
serviceTicket=response_json["response"]["serviceTicket"]
print("The service ticket number is: ", serviceTicket)

print("----------")

api_url="http://127.0.0.1:58000/api/v1/host"
headers={"X-Auth-Token": f"{serviceTicket}"}
resp=requests.get(api_url, headers=headers, verify=False)
print("Request status: ", resp.status_code)
response_json=resp.json()
hosts=response_json["response"]
for host in hosts:
    print (host["hostName"],"\t", host["hostIp"], "\t", host["hostMac"], "\t", host["connectedInterfaceName"])
print("----------")