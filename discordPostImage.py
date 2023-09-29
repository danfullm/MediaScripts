import os
import requests

webhook_url = "https://discord.com/api/webhooks/1157346444240507052/PI2ShdFAGtAz1TsJLSMSbO3-Hcq1vPELYLb2Q-28v2agwpT19GN21kqN0_9We4kWAktn"
image_folder = "C:/Users/dfullman/Downloads/xenia/"

def get_content_type(file_path):
    extension = os.path.splitext(file_path)[1].lower()
    if extension in {".jpg", ".jpeg"}:
        return "image/jpeg"
    elif extension == ".png":
        return "image/png"
    else:
        return "application/octet-stream"

def send_images_to_discord(image_paths):
    files = []
    for image_path in image_paths:
        with open(image_path, "rb") as image_file:
            image_data = image_file.read()
        content_type = get_content_type(image_path)
        files.append(("file", ("image.png", image_data, content_type)))

    payload = {"content": ""}
    response = requests.post(webhook_url, data=payload, files=files)

    if response.status_code == 200:
        print(f"{len(image_paths)} images successfully sent to Discord.")
    else:
        print(f"Failed to send {len(image_paths)} images to Discord. Status code: {response.status_code}")

image_paths = []
for filename in os.listdir(image_folder):
    if filename.endswith((".jpg", ".png", ".gif", ".jpeg")):
        image_path = os.path.join(image_folder, filename)
        image_paths.append(image_path)
        if len(image_paths) == 1:
            send_images_to_discord(image_paths)
            image_paths = []

# Send any remaining images (less than 9)
if image_paths:
    send_images_to_discord(image_paths)
