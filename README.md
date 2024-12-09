# Bayi Harita Uygulaması

Bu proje, Türkiye genelindeki bayilikleri interaktif bir harita üzerinde gösteren bir web uygulamasıdır.

## Özellikler

- İnteraktif Türkiye haritası
- Bayilik noktalarını harita üzerinde görüntüleme
- Şehir bazlı arama yapabilme
- Bayilik detaylarını popup ile görüntüleme
- Haritada yakınlaştırma ve kaydırma özellikleri
- Responsive tasarım

## Kurulum

1. Projeyi klonlayın:
```bash
git clone [repo-url]
cd bayi-harita
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Uygulamayı başlatın:
```bash
npm start
```

Uygulama http://localhost:3000 adresinde çalışmaya başlayacaktır.

## Kullanılan Teknolojiler

- React
- TypeScript
- Leaflet.js
- Styled Components

## Geliştirme

Yeni bayilik eklemek için `src/data/dealers.json` dosyasını düzenleyebilirsiniz. Her bayilik için aşağıdaki formatta veri ekleyebilirsiniz:

```json
{
  "id": number,
  "name": string,
  "city": string,
  "district": string,
  "coordinates": {
    "lat": number,
    "lng": number
  }
}
```

## Lisans

MIT 