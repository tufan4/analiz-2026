# Otonom "Vibe-Coding" Bahis Analiz Ekosistemi - MASTER PLAN

## 1. Genel Mimari
Bu proje, modern web teknolojileri ve güçlü veri bilimi kütüphanelerini birleştiren, tam otonom bir bahis analiz sistemidir.

### Bileşenler:
- **Backend (Python/FastAPI):**
  - **Veri Toplama (Scraper):** `macsonuclari1.net` ve diğer kaynaklardan (hava durumu, haberler) veri çeker. `Selenium` veya `Playwright` kullanır.
  - **Veri İşleme (Pandas):** Ham veriyi temizler, özellik mühendisliği (feature engineering) yapar.
  - **Analiz Motoru (Scikit-learn/XGBoost):** 20 farklı algoritmayı çalıştırır ve "Golden Algorithm"i seçer.
  - **API:** Frontend ile iletişim kurar.

- **Frontend (Next.js/TypeScript):**
  - **UI Kütüphanesi:** Shadcn/UI & Tailwind CSS.
  - **Görseller:** Lucide Icons, Recharts (grafikler).
  - **Dashboard:** Canlı maç tahminleri, algoritma başarı oranları ve sistem durumu.

## 2. Algoritmik Strateji (Backtesting Engine)
Sistem, aşağıdaki gibi 20 farklı yaklaşımı sürekli test eder:
1. **Poisson Dağılımı:** Gol beklentisi (xG) hesaplar.
2. **Monte Carlo Simülasyonu:** Maçı 10,000 kez oynatır.
3. **XGBoost Classifier:** Makine öğrenmesi tabanlı kazanan tahmini.
4. **Random Forest:** Karar ağaçları ile karmaşık desenleri çözer.
5. **Dixon-Coles Modeli:** Takım gücü parametrelerini optimize eder.
6. **Elo Rating System:** Dinamik güç puanlaması.
7. **Gol Ortalaması Ağırlıklı (GA)**
8. **Son 5 Maç Formu (Form)**
9. **Kafa Kafaya (H2H) Analizi**
10. **Ev Sahibi/Deplasman Performansı**
11. **Sakatlık & Ceza Etkisi (Haber Analizi)**
12. **Hava Durumu Faktörü (Yağış/Rüzgar)**
13. **Bahis Oranları Analizi (Value Bet)**
14. **Lineer Regresyon (Trend Analizi)**
15. **Üssel Düzeltme (Son Maçlara Ağırlık)**
16. **Korner/Kart Tahmin Modeli**
17. **İlk Yarı/İkinci Yarı Korelasyonu**
18. **Gol Dakikası Dağılımı**
19. **Takım Moral Endeksi (NLP Haber Analizi)**
20. **Hakem Sertlik Endeksi**

**Golden Algorithm Mantığı:**
Her hafta veya her analiz döngüsünde, son 5 haftalık veriler üzerinde bu 20 algoritma geriye dönük test edilir (Backtest). En yüksek başarı oranına (%80+) sahip model "Aktif Model" olarak işaretlenir ve kullanıcıya sunulan tahminlerde bu modelin ağırlığı %100 olur.

## 3. Kurulum ve Çalıştırma
1. **Backend:**
   ```bash
   cd backend
   pip install -r requirements.txt
   python main.py
   ```
2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 4. Geliştirme Süreci
- **Adım 1:** Altyapı kurulumu (Backend & Frontend).
- **Adım 2:** Scraper modülünün yazılması.
- **Adım 3:** Analiz motorunun (20 algoritma) kodlanması.
- **Adım 4:** API endpoint'lerinin oluşturulması.
- **Adım 5:** Frontend dashboard tasarımı.
- **Adım 6:** Entegrasyon ve Test.
