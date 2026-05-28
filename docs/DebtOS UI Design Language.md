# DebtOS UI Design Language

## 0. Ecosystem Alignment Note

WorkOS is now the primary UI architecture reference for the personal operating system ecosystem.

DebtOS has been aligned to WorkOS at the shell and primitive level:
- Desktop sidebar structure.
- Mobile bottom navigation.
- Sticky app header.
- Square module panel system.
- Subtle module shadows.
- Monochrome icon behavior.
- Compact button/icon button rhythm.
- Modal/sheet rhythm.
- Spacing and typography rhythm.
- Dense operational layout.

DebtOS remains debt-focused, but its application shell should follow the WorkOS architecture direction.

Shared ecosystem UI should feel:
- Industrial operating system.
- Dense operational workflow UI.
- Square and structured.
- Strong border-driven hierarchy.
- System-like rather than decorative.

Avoid across the ecosystem:
- Glassmorphism.
- Soft rounded startup dashboard style.
- Glossy gradients.
- Excessive whitespace.
- Decorative SaaS card layouts.

## 1. Core Identity

DebtOS là một **Personal Debt Operating System**: giao diện tài chính cá nhân dạng hệ điều hành vận hành nợ, không phải app fintech tiêu dùng.

Tinh thần chính:
- Operational, rõ trạng thái, ít trang trí thừa.
- Pixel-inspired nhưng không game-heavy.
- Retro-tech tối giản.
- Dashboard như command center: nhìn nhanh, biết ngay đang nợ bao nhiêu, tháng này còn phải xử lý gì, tiến độ đang ở đâu.

Tone UI:
- Cold & clean.
- Tactical.
- Compact.
- Có chút nhân hóa bằng robot motivation, nhưng không làm mất tính hệ thống.

---

## 2. Visual Direction

### Layout nền
- Background sáng, gần trắng.
- Có grid pattern mảnh như giấy kỹ thuật / console board.
- Không dùng gradient màu mè.
- Không dùng dark fintech style.

### Card system
- Card trắng.
- Border xám nhạt.
- Shadow rất nhẹ hoặc gần như không có.
- Một số card quan trọng có đường dashed black ở top để tạo cảm giác terminal / operating module.
- Góc bo nhẹ, không quá mềm.

### Typography
- Heading chính: đậm, rõ, black.
- Eyebrow label: uppercase, nhỏ, màu xanh xám.
- Số tiền: lớn, đậm, dễ scan.
- Tránh paragraph dài.

### Color system
| Mục đích | Màu |
|---|---|
| Primary text | Black |
| Secondary text | Slate / blue-gray |
| Debt / Risk / Balance | Red |
| Paid / Clear / Success | Green |
| Open obligation / Warning | Orange |
| Card background | White |
| Page background | Very light gray / grid |

---

## 3. Product Language

### Header
Current label:
```text
PERSONAL DEBT OPERATING SYSTEM
DebtOS
```

Đây là naming chuẩn hiện tại. Không quay lại các cụm:
- PERSONAL LEDGER CONSOLE
- SINGLE USER FINANCE OS
- COMMAND DECK
- MVP label không có chức năng

### Module naming
| Tab | Ý nghĩa |
|---|---|
| Dashboard | Tổng quan vận hành tháng hiện tại |
| Projection | Lộ trình trả nợ theo tháng |
| Debts | Debt Registry / danh bạ khoản nợ |
| Payments | Payment History / lịch sử thanh toán |
| Settings | Placeholder, chưa build |

### Preferred UI copy
| Trạng thái | Copy chính | Copy phụ |
|---|---|---|
| Clear | Month clear. Maintain route. | Discipline today, freedom tomorrow. |
| Open | Open obligation remains. Stay on route. | One step today, lighter tomorrow. |
| Warning | Payment risk detected. Stabilize route. | Resolve the gap before it compounds. |

---

## 4. Dashboard Structure

Dashboard nên giữ thứ tự scan:

1. Motivation Box
2. Core stat cards
3. Upcoming Due

### 4.1 Motivation Box
Đây là một box duy nhất, không tách thành nhiều status box.

Thành phần:
- Robot xanh biển bên trái.
- Speech bubble bên cạnh robot.
- Message ngắn theo trạng thái tháng.
- Progress bar trả nợ.
- Paid this month.
- Remaining this month.
- Repayment horizon.
- Status chip: CLEAR / OPEN / WARNING.

Không dùng lại các label trong box:
- REPAYMENT CONTROL PANEL
- MONTHLY DEBT STATUS

Robot behavior:
| Status | Robot emotion |
|---|---|
| CLEAR | Vui / happy |
| OPEN | Buồn nhẹ / concerned |
| WARNING | Lo lắng / worried |

Robot chỉ đóng vai trò motivation companion. Không được chiếm quá nhiều diện tích hoặc biến dashboard thành game UI.

### 4.2 Core Stat Cards
Giữ 3 card chính:
- Total Actual Debt
- Current Month Remaining
- Paid This Month

Rule:
- Total Actual Debt dùng actual replayed state.
- Current Month Remaining là month-aware.
- Paid This Month không tính future payments.

### 4.3 Upcoming Due
Hiển thị các khoản sắp đến hạn.
Nếu không có:
```text
No open due items.
```

---

## 5. Projection UI Rules

Projection là tab vận hành thanh toán.

Cần giữ:
- Month selector rõ ràng.
- Monthly Due, Paid, Remaining, Active Debts ở trên.
- Selected Month Debts là nơi confirm payment.
- 12-Month Overview ở dưới.

Không chuyển Confirm Payment ra Dashboard.
Không phá logic:
- Future payment được phép.
- Future payment giảm actual debt ngay.
- Future payment không cộng vào current-month paid.
- Completed fixed-term debt hide khỏi future projection, trừ khi selected month có payment record.

---

## 6. Debts UI Rules

Debts là registry, không phải nơi thanh toán.

Hiển thị mỗi debt:
- Name
- Type / Due Day / Start Month
- Actual Balance
- Monthly Due
- Due Day
- Interest
- Start Month
- Fixed Term
- Remaining Terms
- Paid status
- Edit button

Critical rule:
Debts tab phải render từ actual replay path, không dùng stale base debts trực tiếp.

Expected consistency:
- Balance phải match Dashboard Total Actual Debt.
- Monthly Due phải luôn là money amount.
- Fixed Term metadata không được mất.
- Remaining Terms phản ánh payment replay.

---

## 7. Payments UI Rules

Payments dùng dạng grouped/collapsible theo debt.

Collapsed summary:
- Debt name
- Current Balance
- Total Paid
- Payment Count
- Latest Payment
- Total paid chip

Expanded rows compact:
```text
2026-06 | Paid 2.000.000 | 8.000.000 -> 6.000.000 | 14:11 27/5/26 | Undo
```

Rules:
- Group sort theo latest payment first.
- Payment rows sort newest first.
- Undo giữ nguyên behavior hiện tại.
- Không render mỗi payment thành card cao riêng biệt.

---

## 8. Data Trust Rules Reflected in UI

DebtOS UI phải luôn tạo cảm giác “một nguồn sự thật”.

Canonical source behavior:
- `payments` là source of truth cho paid state/history.
- `getActualDebts(debts, payments)` là actual-state path chuẩn.
- UI modules phải đọc cùng replayed state khi hiển thị balance/remaining terms.

Không được để các module lệch nhau:
| Module | Phải khớp với |
|---|---|
| Dashboard Total Actual Debt | Debts Balance |
| Projection Paid | Payments history theo selected month |
| Debts Remaining Terms | Payment replay |
| Payments Current Balance | Dashboard actual balance |

---

## 9. Component Style Primitives

Nên duy trì các primitive sau:
- Section header
- Stat card
- Status chip
- Motivation box
- Progress bar
- Registry card
- Compact payment row
- Empty state panel

Status chip:
| Status | Visual |
|---|---|
| CLEAR | Green border/background |
| OPEN | Orange border/background |
| WARNING | Orange/red depending severity |
| PAID | Green |
| ACTUAL BALANCE | Red |

---

## 10. Avoid List

Không nên dùng:
- Generic fintech gradient.
- Decorative mascot không có trạng thái.
- Quá nhiều box motivation lặp lại cùng dữ liệu.
- Label nghe như mockup: MVP, Command Deck nếu không có chức năng thật.
- Chart phức tạp ở phase hiện tại.
- Copy quá cảm xúc hoặc quá motivational kiểu app habit.
- Dark mode trước khi hệ thống core ổn định.

---

## 11. Current Stabilized UI State

Trạng thái UI sau stabilization:
- Header: PERSONAL DEBT OPERATING SYSTEM / DebtOS.
- Dashboard có một Motivation Box với robot xanh biển.
- Robot đổi cảm xúc theo CLEAR / OPEN / WARNING.
- Dashboard giữ 3 stat cards chính bên dưới.
- Projection hiển thị monthly due đúng.
- Debts hiển thị actual replayed balance, monthly due, fixed term, remaining terms đúng.
- Payments đã grouped/collapsible và compact hơn.
- Settings vẫn placeholder.

Historical DebtOS deployment URL:
```text
https://statuesque-kataifi-d8b938.netlify.app
```

Note:
Đây là ghi chú lịch sử của DebtOS, không phải cấu hình release hiện tại của WorkOS. WorkOS release hiện tại dùng Vercel thông qua GitHub `main`.
