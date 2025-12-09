# Gradient Theme - Deep Navy to Electric Blue

## Tổng quan

Đã cập nhật toàn bộ dự án với gradient tối từ **Xanh đậm (Deep Navy / Midnight Blue)** đến **Xanh lam rực (Electric Blue / Royal Blue)** cùng các hiệu ứng smooth transitions.

## Màu sắc chính

### Gradient Background
- **Deep Navy**: `#0a1929` (oklch(0.12 0.06 250))
- **Midnight Blue**: `#1a237e` (oklch(0.18 0.08 250))
- **Royal Blue**: `#0d47a1` (oklch(0.15 0.05 250))
- **Electric Blue**: `#1976d2`, `#1565c0` (oklch(0.65-0.70 0.15-0.18 250))
- **Light Blue Accent**: `#64b5f6`, `#90caf9` (oklch(0.70-0.80 0.15-0.20 250))

## Các thay đổi đã thực hiện

### 1. `app/globals.css`

#### Background Gradient
- Thêm gradient background cố định cho body: `linear-gradient(135deg, #0a1929 0%, #1a237e 50%, #0d47a1 100%)`
- Background attachment: fixed để gradient không scroll
- Thêm radial gradient overlay cho hiệu ứng glow

#### Utility Classes
- `.gradient-dark`: Gradient background chính
- `.gradient-card`: Card với gradient và glassmorphism effect
- `.gradient-glow`: Box shadow với blue glow
- `.smooth-hover`: Smooth transitions với hover effects
- `.text-gradient`: Text với gradient color
- `.animate-gradient`: Animated gradient background
- `.pulse-glow`: Pulsing glow animation

#### Color Variables
- Cập nhật tất cả CSS variables với màu xanh gradient theme
- Primary colors: Electric Blue gradient
- Borders: Blue với opacity
- Cards: Semi-transparent với blue tint

### 2. Components

#### `components/ui/button.tsx`
- Thêm gradient cho default variant: `from-[#1976d2] to-[#1565c0]`
- Hover effects: Scale 105%, shadow với blue glow
- Smooth transitions: `duration-300 ease-in-out`
- Outline variant: Blue border với hover effects

#### `components/ui/card.tsx`
- Border: `border-[#64b5f6]/20`
- Hover: Shadow với blue glow, border highlight
- Smooth transitions: `duration-300 ease-in-out`

#### `components/ui/input.tsx`
- Border: `border-[#64b5f6]/20`
- Focus: Blue border và ring với glow effect
- Smooth transitions: `duration-300 ease-in-out`

#### `components/ui/badge.tsx`
- Default variant: Gradient background
- Hover: Scale effect
- Outline variant: Blue border với hover effects

#### `components/layout/navbar.tsx`
- Background: Semi-transparent với blue tint
- Border: `border-[#64b5f6]/20`
- Backdrop blur effect

### 3. Pages

#### `app/page.tsx` (Trang chủ)
- Animated gradient background với overlay
- Text gradient cho title
- Cards với gradient-card class
- Icons với blue color và hover effects
- Smooth hover animations

#### `app/meetings/page.tsx`
- Cards với gradient-card class
- Smooth hover effects

## Hiệu ứng Smooth

### Transitions
- Tất cả elements: `transition-all duration-300 ease-in-out`
- Colors: `transition-colors duration-200`
- Hover effects: Scale, shadow, glow

### Animations
- `animate-gradient`: Gradient shift animation (8s)
- `pulse-glow`: Pulsing glow effect (2s)
- Smooth scroll: `scroll-behavior: smooth`

### Hover Effects
- Cards: Translate Y -2px, shadow với blue glow
- Buttons: Scale 105%, gradient shift, shadow
- Icons: Color change, scale
- Links: Color transition

## Best Practices đã áp dụng

1. ✅ **Smooth Transitions**: Tất cả interactions có smooth transitions (200-300ms)
2. ✅ **Hover Feedback**: Rõ ràng với scale, shadow, color changes
3. ✅ **Cursor Pointer**: Tất cả clickable elements có cursor-pointer
4. ✅ **Focus States**: Visible focus rings với blue color
5. ✅ **Consistent Timing**: Uniform transition durations
6. ✅ **Performance**: Sử dụng transform và opacity cho animations
7. ✅ **Accessibility**: Maintained contrast ratios

## Cách sử dụng

### Gradient Background
```tsx
<div className="gradient-dark">
  {/* Content */}
</div>
```

### Gradient Card
```tsx
<Card className="gradient-card smooth-hover">
  {/* Content */}
</Card>
```

### Text Gradient
```tsx
<h1 className="text-gradient">Title</h1>
```

### Smooth Hover
```tsx
<div className="smooth-hover cursor-pointer">
  {/* Content */}
</div>
```

## Màu sắc Reference

| Mục đích | Màu | Hex | Usage |
|---------|-----|-----|-------|
| Background Start | Deep Navy | `#0a1929` | Gradient start |
| Background Middle | Midnight Blue | `#1a237e` | Gradient middle |
| Background End | Royal Blue | `#0d47a1` | Gradient end |
| Primary | Electric Blue | `#1976d2` | Buttons, links |
| Primary Dark | Royal Blue | `#1565c0` | Button gradient |
| Accent | Light Blue | `#64b5f6` | Borders, icons |
| Accent Light | Sky Blue | `#90caf9` | Hover states |

## Responsive

Tất cả gradient và effects đều responsive:
- Mobile: Full gradient background
- Tablet: Optimized gradients
- Desktop: Enhanced glow effects

## Performance

- CSS animations sử dụng GPU acceleration
- Transitions tối ưu với transform và opacity
- Background gradient fixed để tránh re-render
- Smooth scroll behavior

## Notes

- Gradient background được set ở body level để áp dụng toàn bộ app
- Tất cả cards và interactive elements có hover effects
- Blue glow effects tạo depth và modern look
- Smooth transitions tạo professional feel


