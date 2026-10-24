# Lunarfall proje kuralları

## Sürümleme

- X.Y.Z standardını kullan. Kullanıcıya görünen sürüm numarası v öneki taşır (ör. v0.8.3).
- X (MAJOR): kapsamlı yeniden yazım veya temel mimari değişimi. Artınca Y ve Z sıfırlanır.
- Y (FEATURE): yeni özellik. Artınca Z sıfırlanır.
- Z (HOTFIX): büyüklüğünden bağımsız her hata düzeltmesi, güvenlik düzeltmesi ve uyumluluk onarımı. Artınca yalnızca Z değişir.
- Bir sürüm birden fazla düzeltme içerebilir. Her küçük kod değişikliğinde otomatik sürüm yükseltme; tamamlanmış mantıksal değişiklik paketi için sürümü değerlendir. Kullanıcının belirlediği sürüm hedefini uygula.
- Son yayımlanmış sürüm v0.8.0'dır; mevcut geliştirme sürümü v0.8.3'tür. Yayımlama doğrulanmadıkça geliştirme sürümünü yayımlanmış olarak tanımlama.
- Her sürüm değişikliğinde Lunarfall/theme_info.xml, README.md ve changelog.txt dosyalarını senkronize et; bu dosyadaki geliştirme/yayımlanmış sürüm durumunu da güncel tut. Gerçek başka tema sürüm tanımları varsa onları da güncelle.
- SMF'nin okuyacağı metadata alanlarında mevcut teknik sözdizimini koru: theme_info.xml içindeki version değeri sayısal X.Y.Z biçimindedir. Kullanıcıya görünen sürüm etiketlerinde vX.Y.Z kullan.
- Lunarfall sürümünü SMF çekirdek sürümüyle karıştırma. PHP theme_version uyumluluk alanını ve upstream SMF @version yorumlarını Lunarfall sürümüyle değiştirme.
- Changelog geçmişini koru; yeni sürüm kaydını en üste ekle. Kullanıcı ayrıca istemedikçe changelog.txt dosyasını yeniden adlandırma.

## Dosya ve değişiklik sınırları

- Lunarfall/ yalnızca dağıtılabilir tema içeriğidir. Geliştirme raporu, test betiği veya çalışma belgesi ekleme.
- Analiz, test ve çalışma belgelerini proje kökündeki .codex-reports/ altında tut.
- .codex-reports/ Git tarafından izlenmez; kök .gitignore içindeki /.codex-reports/ kuralını koru. Bu klasörü zorla Git'e ekleme.
- SMF çekirdeği ve Default Theme referanstır; kullanıcı açıkça izin vermedikçe değiştirme.
- Lunarfall'un tasarım özelleştirmelerini yapısal uyumluluk gerekçesiyle silme. Farklı markup veya CSS tek başına hata değildir; işlevsel gerekliliği çekirdekten doğrula. Belirsiz tasarım değişikliklerini raporla ve onay bekle.
- İkon glyph/font ailesi eşlemelerinin merkezi Lunarfall/css/extra-ico.css dosyasıdır. PHP/JS içinde glyph kodu çoğaltma; hedeflerin Font Awesome Free kapsamını doğrula, solid/regular/brands ayrımını ve dağıtılan lisans/atıfları koru. Font Awesome için CDN/kit veya Pro bağımlılığı ekleme.
- İlgisiz kaynakları geri alma, Git geçmişini sıfırlama ve başka projelere müdahale etme.

## Kaynak, kurulum ve deploy

- Kaynak sürümünü Lunarfall/theme_info.xml dosyasından; kurulu sürümü ayrıca kurulu temanın theme_info.xml dosyasından doğrula. Bilinen kurulum yolu D:\PersonalProjects\smf21\Themes\Lunarfall'dur; farklı ortamda yolu ayrıca doğrula.
- Lunarfall'un gerçek kaynak/kurulu sürümünde tek doğruluk kaynağı ilgili theme_info.xml dosyasıdır. Footer sürümü bu dosyadan güvenli biçimde, istek başına en fazla bir kez okunarak gösterilir; kalıcı sürüm önbelleği oluşturma.
- Sürüm etiketlerinin aynı olması patch'lerin kurulu olduğunu kanıtlamaz. Kaynaktaki dağıtılabilir dosyaları kurulumdaki aynı göreli yolların SHA-256 değerleriyle karşılaştır; eksik, farklı ve yalnızca kurulumda bulunan dosyaları ayrı raporla.
- Dosya metadata'sından aktif tema seçimini veya SMF yönetim panelindeki/veritabanındaki sürüm bilgisini doğrulanmış sayma.
- Deploy sonrasında kurulu theme_info.xml, footer ve dağıtılabilir dosyaların hash'lerini doğrula. SMF yönetim panelindeki kayıtlı sürüm eski kalabilir; bu bilgi dosya/footer sürümünden ayrıdır ve aradaki fark raporlanır.
- Her rutin tema deploy işleminde {db_prefix}themes tablosundaki version kaydını güncellemek zorunlu değildir. Veritabanını yalnızca açıkça yetkilendirilmiş ayrı bir görevde değiştir. Paket güncelleme mekanizması ileride ayrıca ele alınacaktır.
- Kaynak sürümünün yükselmesi yayın veya deploy değildir. Kullanıcı deploy istemedikçe çalışan kuruluma otomatik kopyalama/deploy yapma. Sonuç raporunda kaynak sürümünü, ayrı doğrulanan kurulu sürümü, kontrolleri ve deploy durumunu belirt.
