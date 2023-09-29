import os
import shutil
import logging

source_directory = r'\\costar\marketing\Editorial\Choral Tracks\Hard Drive Dump Aug 2021'
destination_directory = r'\\costar\POD\batchzip'

log_file = 'copy_log.txt'
logging.basicConfig(filename=log_file, level=logging.INFO, format='%(asctime)s - %(message)s')

def copy_folders(source_dir, dest_dir, batch_size=500):
    folders = [foldername for foldername in os.listdir(source_dir) if not foldername.startswith('CT-') and os.path.isdir(os.path.join(source_dir, foldername))]

    total_folders = len(folders)
    folder_number = 0

    while folders:
        batch = folders[:batch_size]
        folders = folders[batch_size:]

        for foldername in batch:
            source_path = os.path.join(source_dir, foldername)
            dest_path = os.path.join(dest_dir, foldername)

            try:
                shutil.copytree(source_path, dest_path)
                folder_number += 1
                print(f"Copying folder {folder_number} of {total_folders}: {foldername} to {dest_path}")
            except Exception as e:
                print(f"Error copying {foldername}: {str(e)}")

        logging.info(f"Processed {len(batch)} folders")

        # Create a "ready.txt" file in the destination directory
        ready_file_path = os.path.join(dest_dir, 'ready.txt')
        with open(ready_file_path, 'w') as ready_file:
            ready_file.write("Ready for the next batch. Press Enter to continue...")

        # Pause and wait for your confirmation
        input("Press Enter to continue to the next batch...")

if not os.path.exists(destination_directory):
    os.makedirs(destination_directory)

copy_folders(source_directory, destination_directory)
