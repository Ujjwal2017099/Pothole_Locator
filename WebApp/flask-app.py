import torch
import os, tqdm
from PIL import Image
import pandas as pd
import numpy as np, cv2, random
from time import time
import requests

from flask import Flask, request, Response, jsonify, render_template, flash, redirect
from flask_cors import CORS, cross_origin

from helpers.functions import *


model = loadModel('yolov7_e6e_training/best.pt')

app = Flask(__name__)
app.secret_key = "162833"






# def loadModel(path:str):
#   model = torch.hub.load("WongKinYiu/yolov7","custom",path,trust_repo=True)
#   return model

print("App initialised")



# def plot_one_box(x, img, color=None, label=None, line_thickness=3):
#   # Plots one bounding box on image img
#   tl = line_thickness or round(0.002 * (img.shape[0] + img.shape[1]) / 2) + 1  # line/font thickness
#   color = color or [random.randint(0, 255) for _ in range(3)]
#   c1, c2 = (int(x[0]), int(x[1])), (int(x[2]), int(x[3]))
#   cv2.rectangle(img, c1, c2, color, thickness=tl, lineType=cv2.LINE_AA)
#   if label:
#     tf = max(tl - 1, 1)  # font thickness
#     t_size = cv2.getTextSize(label, 0, fontScale=tl / 3, thickness=tf)[0]
#     c2 = c1[0] + t_size[0], c1[1] - t_size[1] - 3
#     cv2.rectangle(img, c1, c2, color, -1, cv2.LINE_AA)  # filled
#     cv2.putText(img, label, (c1[0], c1[1] - 2), 0, tl / 3, [225, 255, 255], thickness=tf, lineType=cv2.LINE_AA)
#     cv2.imwrite("snapshots/1043.jpg", im0)
#     print(f" The image with the result is saved in: snapshots/1043.jpg")
#
#
# def pred_img():
#   img = Image.open('test/images/1043.jpg')
#   im0 = numpy.array(img)
#   width, height = img.width, img.height
#
#   results = model(img, size=640, augment=True)  # custom inference size
#   # preds = results.pandas().xyxy[0]
#   preds = results.xyxy[0]
#
#   for *xyxy, conf, cls in preds:
#     plot_one_box(xyxy, im0, label=label, color=None, line_thickness=2)
#
# def send_req(path_img, lat, lon):
#   with open(path_img, 'rb') as img:
#     name_img = os.path.basename(path_img)
#     files = {'file': (name_img, img, 'image/png')}
#     with requests.Session() as s:
#       r = s.post(url, files=files, data={'latitude': lat, 'longitude': lon})
#       print(r)
#
# def plot_boxes(results, frame, frame_num, lat, lon):
#   labels, cord = results
#   n = len(labels)
#   x_shape, y_shape = frame.shape[1], frame.shape[0]
#   for i in range(n):
#     row = cord[i]
#     # If score is less than 0.2 we avoid making a prediction.
#     if row[4] < 0.2:
#       continue
#     x1 = int(row[0] * x_shape)
#     y1 = int(row[1] * y_shape)
#     x2 = int(row[2] * x_shape)
#     y2 = int(row[3] * y_shape)
#     bgr = (0, 255, 0)  # color of the box
#     label = 'pothole'  # Get the name of label index
#     label_font = cv2.FONT_HERSHEY_SIMPLEX  # Font for the label.
#     cv2.rectangle(frame, (x1, y1), (x2, y2), bgr, 2)  # Plot the boxes
#     cv2.putText(frame, label, (x1, y1), label_font, 0.9, bgr, 2)  # Put a label over box.
#   print("Plot")
#   try:
#     os.mkdir(crop_path)
#   except FileExistsError:
#     pass
#   # if (frame_num % crop_rate == 0):
#   #   cropped_img = frame[int(y1) - 5:int(y2) + 5, int(x1) - 5:int(x2) + 5]
#   #   cv2.imwrite(crop_path+ "/" + str(frame_num) + ".jpg", cropped_img)
#   #   print("Frame saved")
#   if (frame_num % crop_rate == 0):
#     path_img = crop_path + "/" + str(frame_num) + ".png"
#     cv2.imwrite(path_img, frame)
#     # send_req(path_img, lat, lon)
#     print("Frame saved")
#
#   return frame


def pred_video(video_path, lat, lon):
  out = None
  try:
    vid = cv2.VideoCapture(int(video_path))
  except:
    vid = cv2.VideoCapture(video_path)
    out = True

  if out :
    width = int(vid.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(vid.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(vid.get(cv2.CAP_PROP_FPS))
    print(fps)
    codec = cv2.VideoWriter_fourcc(*'XVID')
    out = cv2.VideoWriter('snapshots/videos/out.avi', codec, fps, (width, height))

  frame_num = 0
  # input_size = 640
  while True:
    return_value, frame = vid.read()
    if return_value:
      frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
      frame_num += 1
      # image = Image.fromarray(frame)
    else:
      print('Video has ended or failed, try a different video format!')
      break

    start_time = time()  # We would like to measure the FPS.
    results = model(frame, size=640, augment=True)  # custom inference size
    labels = results.xyxyn[0][:, -1].numpy()
    # print(labels)
    cord = results.xyxyn[0][:, :-1].numpy()
    if (len(labels)):
      frame = plot_boxes((labels, cord), frame, frame_num, lat, lon)  # Plot the boxes.
    end_time = time()
    fps = 1 / np.round(end_time - start_time, 3)  # Measure the FPS.
    print(f"Cnt = {frame_num}, Frames Per Second : {fps}")
    frame = np.asarray(frame)
    if out:
      out.write(frame)  # Write the frame onto the output.
    else:
      cv2.namedWindow("result", cv2.WINDOW_AUTOSIZE)
      frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)
      cv2.imshow("result", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
      print("Stream Closed")
      break

  cv2.destroyAllWindows()

# pred_video(0)
# pred_video(video_path)

@app.route("/live", methods=['GET', 'POST'])
def inference():
  if request.method == 'POST':
    # print(request)
    # print(request.form)
    # print(request.files)
    # return "FILE RECEIVED"
    if 'file' not in request.files:
      flash('No file part')
      return redirect(request.url)
    file = request.files['file']
    lat = request.form['lat']
    lon = request.form['lon']
    print(file)
    print(lat, lon)
    if file.filename == '':
      flash('No file selected for uploading')
      return redirect(request.url)
    video_path = f'uploads/{file.filename}'
    file.save(video_path)
    print("File saved successfully")
    pred_video(video_path, lat, lon)
    os.remove(video_path)
    print("File deleted successfully")
    # return "Inference Done"
    render_template("video.html", flash_msg=False)
  # return "VIDEO INFERENCE"
  return render_template("video.html", flash_msg=True)


@app.route("/image", methods=["GET"])
def img_inference():
  pred_video(0, 30, 70)
  return "IMG INFERENCE"

@app.route("/")
def index():
  # return "FLASK APP INITIALISED"
  return render_template("index.html")


if __name__ == '__main__':
    app.run(debug=True)


'''

def crop_objects(img, data, path, allowed_classes):
  boxes, scores, classes, num_objects = data
  class_names = read_class_names(cfg.YOLO.CLASSES)
  # create dictionary to hold count of objects for image name
  counts = dict()
  for i in range(num_objects):
    # get count of class for part of image name
    class_index = int(classes[i])
    class_name = class_names[class_index]
    if class_name in allowed_classes:
      counts[class_name] = counts.get(class_name, 0) + 1
      # get box coords
      xmin, ymin, xmax, ymax = boxes[i]
      # crop detection from image (take an additional 5 pixels around all edges)
      cropped_img = img[int(ymin) - 5:int(ymax) + 5, int(xmin) - 5:int(xmax) + 5]
      print(type(cropped_img))

      if cropped_img.size:
        # construct image name and join it to path for saving crop properly
        img_name = class_name + '_' + str(counts[class_name]) + '.png'
        img_path = os.path.join(path, img_name)
        # save image
        cv2.imwrite(img_path, cropped_img)
    else:
      continue
      
def score_frame(frame, model):
  # device = 'cuda' if torch.cuda.is_available() else 'cpu'
  # model.to(device)
  # frame = [torch.tensor(frame)]
  results = model(frame, size=640, augment=True)  # custom inference size
  labels = results.xyxyn[0][:, -1].numpy()
  cord = results.xyxyn[0][:, :-1].numpy()
  return labels, cord
'''