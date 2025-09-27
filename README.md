# Tết Trung Thu - Ứng dụng Chọn Phần Thưởng

Một ứng dụng React đơn trang với giao diện đẹp mắt cho phép người dùng chọn phần thưởng trong sự kiện Tết Trung Thu.

## Tính năng

- Hiển thị danh sách phần thưởng dưới dạng lưới hoặc vòng quay
- Vòng quay thực sự hoạt động với hiệu ứng quay mượt mà
- Hiệu ứng âm thanh khi quay vòng và khi thắng giải
- Hiệu ứng hoạt ảnh mượt mà khi di chuột qua các phần thưởng
- Phân loại phần thưởng theo độ hiếm (Common, Rare, Epic, Legendary)
- Hiệu ứng ánh sáng và hạt cho các phần thưởng cao cấp
- Hiệu ứng confetti khi xác nhận chọn phần thưởng
- Lưu lựa chọn vào localStorage để hiển thị "Đã chọn trước đó"
- Hỗ trợ điều hướng bàn phím và truy cập
- Thiết kế responsive cho cả thiết bị di động và máy tính

## Công nghệ sử dụng

- React (Functional Components + Hooks)
- TypeScript
- Tailwind CSS (với các tiện ích tùy chỉnh)
- Framer Motion cho hiệu ứng chuyển động
- React Confetti cho hiệu ứng pháo hoa
- Canvas API cho hiệu ứng hạt nền

## Cài đặt

1. Clone repository:

```bash
git clone <repository-url>
cd trungthu
```

2. Cài đặt các gói phụ thuộc:

```bash
npm install
```

3. Khởi chạy ứng dụng ở môi trường phát triển:

```bash
npm run dev
```

4. Mở trình duyệt và truy cập: `http://localhost:5173`

## Cấu trúc dự án

```
trungthu/
├── public/
│   ├── assets/         # Hình ảnh phần thưởng (placeholder)
│   └── sounds/         # Âm thanh cho vòng quay
├── src/
│   ├── components/     # Các thành phần React
│   │   ├── ParticleBackground.tsx
│   │   ├── PlaceholderIcons.tsx
│   │   ├── PrizeCard.tsx
│   │   ├── PrizeGrid.tsx
│   │   ├── PrizeModal.tsx
│   │   ├── SpinWheel.tsx
│   │   └── Toast.tsx
│   ├── data/
│   │   └── prizes.ts   # Dữ liệu phần thưởng
│   ├── hooks/
│   │   ├── useKeyboardNavigation.ts
│   │   ├── useLocalStorage.ts
│   │   └── useSound.ts
│   ├── styles/
│   │   └── globals.css # CSS toàn cục và Tailwind imports
│   ├── App.tsx         # Component chính
│   └── main.tsx        # Điểm vào ứng dụng
├── tailwind.config.js  # Cấu hình Tailwind
├── postcss.config.js   # Cấu hình PostCSS
└── package.json        # Cấu hình dự án và dependencies
```

## Scripts

- `npm run dev`: Khởi chạy máy chủ phát triển
- `npm run build`: Build ứng dụng cho môi trường production
- `npm run lint`: Kiểm tra lỗi với ESLint
- `npm run preview`: Xem trước bản build
- `npm start`: Alias cho `npm run dev`

## Hướng dẫn sử dụng

1. Khi trang tải, bạn sẽ thấy lưới các phần thưởng có sẵn
2. Chuyển đổi giữa chế độ xem lưới và vòng quay bằng các nút ở trên cùng
3. Trong chế độ lưới:
   - Di chuột qua các phần thưởng để xem hiệu ứng và chi tiết
   - Nhấn nút "Chọn" hoặc nhấp vào thẻ phần thưởng để chọn
4. Trong chế độ vòng quay:
   - Nhấn nút "Quay ngay!" để quay vòng quay
   - Chờ vòng quay dừng lại để xem phần thưởng của bạn
5. Xác nhận lựa chọn trong modal hiện ra
6. Xem thông báo xác nhận và hiệu ứng confetti

## Truy cập và hỗ trợ bàn phím

- Tab: Di chuyển giữa các phần thưởng
- Enter/Space: Chọn phần thưởng đang được focus
- Mũi tên: Di chuyển giữa các phần thưởng trong lưới
- Esc: Đóng modal

## Tùy chỉnh

Bạn có thể dễ dàng tùy chỉnh ứng dụng bằng cách:

1. Thay đổi màu sắc và theme trong `tailwind.config.js`
2. Cập nhật danh sách phần thưởng trong `src/data/prizes.ts`
3. Thêm hình ảnh thực tế vào thư mục `public/assets/`
4. Thay đổi âm thanh vòng quay trong thư mục `public/sounds/`

## Giấy phép

MIT
# tettrungthu
