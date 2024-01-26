import torch
from PIL import Image
import numpy as np, cv2, random
import requests
import os


def loadModel(path:str):
  model = torch.hub.load("WongKinYiu/yolov7","custom",path,trust_repo=True)
  return model

def plot_one_box(x, img, color=None, label=None, line_thickness=3):
  # Plots one bounding box on image img
  tl = line_thickness or round(0.002 * (img.shape[0] + img.shape[1]) / 2) + 1  # line/font thickness
  color = color or [random.randint(0, 255) for _ in range(3)]
  c1, c2 = (int(x[0]), int(x[1])), (int(x[2]), int(x[3]))
  cv2.rectangle(img, c1, c2, color, thickness=tl, lineType=cv2.LINE_AA)
  if label:
    tf = max(tl - 1, 1)  # font thickness
    t_size = cv2.getTextSize(label, 0, fontScale=tl / 3, thickness=tf)[0]
    c2 = c1[0] + t_size[0], c1[1] - t_size[1] - 3
    cv2.rectangle(img, c1, c2, color, -1, cv2.LINE_AA)  # filled
    cv2.putText(img, label, (c1[0], c1[1] - 2), 0, tl / 3, [225, 255, 255], thickness=tf, lineType=cv2.LINE_AA)
    cv2.imwrite("snapshots/1043.jpg", im0)
    print(f" The image with the result is saved in: snapshots/1043.jpg")


def send_req(path_img, lat, lon):
  url = 'http://localhost:4000/upload-pothole-location'
  with open(path_img, 'rb') as img:
    name_img = os.path.basename(path_img)
    files = {'file': (name_img, img, 'image/png')}
    with requests.Session() as s:
      r = s.post(url, files=files, data={'latitude': lat, 'longitude': lon})
      print(r)

def pred_img():
  img = Image.open('test/images/1043.jpg')
  im0 = numpy.array(img)
  width, height = img.width, img.height

  results = model(img, size=640, augment=True)  # custom inference size
  # preds = results.pandas().xyxy[0]
  preds = results.xyxy[0]

  for *xyxy, conf, cls in preds:
    plot_one_box(xyxy, im0, label=label, color=None, line_thickness=2)


def plot_boxes(results, frame, frame_num, lat, lon):
  crop_path = "snapshots/videos/out_frames"
  crop_rate = 5
  labels, cord = results
  n = len(labels)
  x_shape, y_shape = frame.shape[1], frame.shape[0]
  for i in range(n):
    row = cord[i]
    # If score is less than 0.2 we avoid making a prediction.
    if row[4] < 0.2:
      continue
    x1 = int(row[0] * x_shape)
    y1 = int(row[1] * y_shape)
    x2 = int(row[2] * x_shape)
    y2 = int(row[3] * y_shape)
    bgr = (0, 255, 0)  # color of the box
    label = 'pothole'  # Get the name of label index
    label_font = cv2.FONT_HERSHEY_SIMPLEX  # Font for the label.
    cv2.rectangle(frame, (x1, y1), (x2, y2), bgr, 2)  # Plot the boxes
    cv2.putText(frame, label, (x1, y1), label_font, 0.9, bgr, 2)  # Put a label over box.
  print("Plot")
  try:
    os.mkdir(crop_path)
  except FileExistsError:
    pass
  # if (frame_num % crop_rate == 0):
  #   cropped_img = frame[int(y1) - 5:int(y2) + 5, int(x1) - 5:int(x2) + 5]
  #   cv2.imwrite(crop_path+ "/" + str(frame_num) + ".jpg", cropped_img)
  #   print("Frame saved")
  if (frame_num % crop_rate == 0):
    path_img = crop_path + "/" + str(frame_num) + ".png"
    cv2.imwrite(path_img, frame)
    send_req(path_img, lat, lon)
    print("Frame saved")

  return frame