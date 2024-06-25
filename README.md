# App Online Doctor Appointment

## Mô tả
Ứng dụng đặt lịch hẹn bác sĩ trực tuyến.

## Yêu cầu
- Node.js v20.12.1
- Yarn
- Expo CLI
- EAS CLI

## Hướng dẫn cài đặt

### Bước 1: Tạo tài khoản trên GetStream
1. Truy cập trang [GetStream](https://getstream.io/).
2. Tạo tài khoản và lấy `STREAM_API_KEY` và `STREAM_API_SECRET`.

### Bước 2: Clone repository
1. Mở terminal hoặc command prompt.
2. Chạy lệnh sau để clone repository:
    ```sh
    git clone https://github.com/NgocTruong0701/app_online_doctor_appointment.git
    ```
3. Di chuyển vào thư mục dự án:
    ```sh
    cd app_online_doctor_appointment
    ```

### Bước 3: Cài đặt Yarn
1. Nếu bạn chưa cài đặt Yarn, chạy lệnh sau:
    ```sh
    npm install --global yarn
    ```

### Bước 4: Cài đặt các gói phụ thuộc
1. Chạy lệnh sau để cài đặt các gói phụ thuộc:
    ```sh
    yarn
    ```

### Bước 5: Tạo tài khoản Expo và tạo một project
1. Truy cập [Expo](https://expo.dev/) và tạo tài khoản nếu bạn chưa có.
2. Tạo một project mới trên Expo.

### Bước 6: Cài đặt EAS CLI
1. Chạy lệnh sau để cài đặt EAS CLI:
    ```sh
    npm install -g eas-cli
    ```

### Bước 7: Đăng nhập vào EAS
1. Chạy lệnh sau để đăng nhập vào EAS:
    ```sh
    eas login
    ```

### Bước 8: Cấu hình build với EAS
1. Chạy lệnh sau để cấu hình build:
    ```sh
    eas build:configure
    ```

### Bước 9: Build ứng dụng cho Android
1. Chạy lệnh sau để build ứng dụng cho Android:
    ```sh
    yarn build:dev:android
    ```

## Ghi chú
- Đảm bảo bạn đã thêm `STREAM_API_KEY` và `STREAM_API_SECRET` vào các tệp cấu hình cần thiết trong dự án.
- Kiểm tra kỹ các bước trên để đảm bảo không có bước nào bị bỏ qua hoặc thực hiện sai.

Chúc bạn thành công với dự án!
