import os
import shutil
import pandas as pd
from datetime import datetime

def convert_to_mmddyy_format(date_str):
    date_obj = datetime.strptime(date_str, "%m/%d/%Y")
    return date_obj.strftime("%m%d%y")

def find_files_by_created_date(server_path, product_created_date):
    product_created_date_mmddyy = convert_to_mmddyy_format(product_created_date)
    for root, dirs, files in os.walk(server_path):
        # Check if the current folder matches the desired dated folder format (mmddyy).
        if os.path.basename(root) == product_created_date_mmddyy:
            for dirpath, dirnames, filenames in os.walk(root):
                # Ignore specific subfolders called "00_covers" and "00_scores".
                dirs[:] = [d for d in dirnames if d not in ("00_covers", "00_scores")]
                for filename in filenames:
                    file_path = os.path.join(dirpath, filename)
                    # Perform the action you want with the file, e.g., copy or move.
                    # For example, to copy the files to the destination folder:
                    destination_folder = r"\\costar\POD\Work\04_Dan\ppressFiles"  # Updated destination folder.
                    if os.path.exists(file_path):
                        try:
                            shutil.copy(file_path, destination_folder)
                            print(f"File copied: {file_path} --> {destination_folder}")
                        except Exception as e:
                            print(f"Failed to copy: {file_path}. Error: {e}")
                    else:
                        print(f"File not found: {file_path}")

if __name__ == "__main__":
    server_path = r"\\costar\MyScore"  # Replace with the correct server path.

    # Read the CSV file containing the product created dates.
    csv_file_path = "missingFilesDates.csv"  # Replace with the path to your CSV file.

    try:
        df = pd.read_csv(csv_file_path)
        print("Reading the CSV file...")
        print(df["CreatedDate"])

        # Iterate through the "CreatedDate" column and run the script for each date.
        for date_str in df["CreatedDate"]:
            print(f"\nProcessing files for date: {date_str}")
            find_files_by_created_date(server_path, date_str)

    except Exception as e:
        print(f"An error occurred while reading the CSV file: {e}")
