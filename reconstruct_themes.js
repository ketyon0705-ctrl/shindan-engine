const fs = require('fs');

const masterList = fs.readFileSync('theme_master_list.md', 'utf8');

// 1. Recovered Data (Hardcoded)
const recovered = {
    "onsen": {
        "meta": {
            "title": "あなたの温泉タイプ診断（青森版）",
            "description": "数えきれないほどの温泉がある青森県。あなたの性格や好みから、運命の温泉郷を導き出します。",
            "price": 150,
            "themeColor": "#2dd4bf",
            "themeGradient": "linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%)",
            "stripeUrl": "https://buy.stripe.com/5kQ5kDcp27Y38MV9Xx8EM02"
        },
        "questions": [
            { "id": "q1", "text": "休日の朝、目が覚めた瞬間の気分は？", "options": [{ "label": "「もう少し寝たい…」二度寝モード", "score": { "healing": 2, "wild": 0, "luxury": 0 } }, { "label": "「今日は何しよう！」即活動モード", "score": { "healing": 0, "wild": 2, "luxury": 0 } }, { "label": "「美味しいコーヒー飲もう」優雅モード", "score": { "healing": 0, "wild": 0, "luxury": 2 } }] },
            { "id": "q2", "text": "友人と食事へ。店選びの基準は？", "options": [{ "label": "個室があって静かに話せる店", "score": { "healing": 2, "wild": 0, "luxury": 1 } }, { "label": "ワイワイガヤガヤ活気のある人気店", "score": { "healing": 0, "wild": 2, "luxury": 0 } }, { "label": "夜景が綺麗・内装が豪華な映え店", "score": { "healing": 0, "wild": 0, "luxury": 2 } }] },
            { "id": "q3", "text": "旅行のバッグ、荷造りはどうする？", "options": [{ "label": "心配性で荷物は多めになるタイプ", "score": { "healing": 1, "wild": 0, "luxury": 1 } }, { "label": "必要最低限！リュック一つでOK", "score": { "healing": 0, "wild": 2, "luxury": 0 } }, { "label": "服のコーデに合わせて鞄も変えたい", "score": { "healing": 0, "wild": 0, "luxury": 2 } }] },
            { "id": "q4", "text": "ストレスが限界に達するとどうなる？", "options": [{ "label": "誰とも話したくなくなる・引きこもる", "score": { "healing": 3, "wild": 0, "luxury": 0 } }, { "label": "衝動買いや暴飲暴食に走る", "score": { "healing": 0, "wild": 2, "luxury": 2 } }, { "label": "とにかく体を動かして発散する", "score": { "healing": 0, "wild": 2, "luxury": 0 } }] },
            { "id": "q5", "text": "もし魔法が一つだけ使えるなら？", "options": [{ "label": "空を自由に飛びたい", "score": { "healing": 1, "wild": 2, "luxury": 0 } }, { "label": "動物と話ができるようになりたい", "score": { "healing": 2, "wild": 1, "luxury": 0 } }, { "label": "一瞬で億万長者になりたい", "score": { "healing": 0, "wild": 0, "luxury": 3 } }] },
            { "id": "q6", "text": "「成功」と聞いてイメージするのは？", "options": [{ "label": "愛する家族と平穏に暮らすこと", "score": { "healing": 3, "wild": 0, "luxury": 0 } }, { "label": "自分の名前を歴史に残すこと", "score": { "healing": 0, "wild": 3, "luxury": 1 } }, { "label": "欲しいものを自由に買える財力", "score": { "healing": 0, "wild": 0, "luxury": 2 } }] },
            { "id": "q7", "text": "最後に。今一番欲しいものは？", "options": [{ "label": "「何もしなくていい時間」", "score": { "healing": 3, "wild": 0, "luxury": 0 } }, { "label": "「ワクワクするような冒険」", "score": { "healing": 0, "wild": 3, "luxury": 0 } }, { "label": "「極上のサービスと空間」", "score": { "healing": 0, "wild": 0, "luxury": 3 } }] }
        ],
        "results": {
            "healing": { "title": "癒やしの名湯「浅虫温泉」タイプ", "image": "https://dummyimage.com/600x400/94d2bd/fff&text=Asamushi+Onsen", "short_desc": "心身ともにリラックスを求めているあなたには、青森の奥座敷「浅虫温泉」がぴったり。", "teaser": "穏やかで協調性の高いあなたですが、実は心の奥底に「誰にも理解されない孤独」を抱えていませんか？その寂しさが才能に変わる瞬間まで、あと一歩です。", "details": [{ "heading": "♨️ 本質：静寂を愛する賢者", "content": "あなたは、周囲の喧騒から一歩引いて物事を俯瞰できる、非常に高い洞察力を持った「隠れ賢者」タイプです..." }, { "heading": "🗺️ アクション：水平線を見る時間を増やす", "content": "あなたのエネルギーチャージに必要なのは、「情報の遮断」と「視覚的な広がり」です..." }, { "heading": "💞 相性：無言が心地よい「空気」のような人", "content": "「沈黙が気にならない相手」こそが、あなたの運命のパートナーです..." }] },
            "wild": { "title": "野生味あふれる「酸ヶ湯温泉」タイプ", "image": "https://dummyimage.com/600x400/e9d8a6/fff&text=Sukayu+Onsen", "short_desc": "強い刺激と非日常を求めるあなたには、総ヒバ造りの千人風呂「酸ヶ湯温泉」が運命の場所。", "teaser": "エネルギッシュなあなたですが、実は「自分はもっとやれるはずだ」という焦燥感に毎晩襲われていませんか？...", "details": [{ "heading": "♨️ 本質：既存の枠を壊す革命家", "content": "あなたは、決められたレールの上を歩くことに強烈な退屈を感じる「革命家」タイプです..." }, { "heading": "🗺️ アクション：限界突破の経験を積む", "content": "あなたのストレス解消法は「休息」ではなく「発散」です..." }, { "heading": "💞 相性：ブレーキを踏まない「共犯者」", "content": "あなたの突飛なアイデアに対して..." }] },
            "luxury": { "title": "大正ロマンの宿「古牧温泉」タイプ", "image": "https://dummyimage.com/600x400/ee9b00/fff&text=Komaki+Onsen", "short_desc": "優雅なひとときとエンタメを楽しみたいあなたには、華やかな「古牧温泉」エリアがおすすめ。", "teaser": "華やかな成功を求めているあなたですが、実は「本当の自分を見てもらったことがない」という空虚さを感じていませんか？...", "details": [{ "heading": "♨️ 本質：世界を彩るアーティスト", "content": "あなたは、ただ生きるだけではなく、人生を「作品」として美しく仕上げたいと願う「アーティスト」タイプです..." }, { "heading": "🗺️ アクション：一流のサービスを受ける", "content": "あなたが疲れた時に必要なのは、チープな気休めではありません..." }, { "heading": "💞 相性：完璧なあなたを全肯定する「ファン」", "content": "あなたのパートナーにふさわしいのは..." }] }
        }
    },
    "love01": {
        "meta": {
            "title": "運命の「ソウルメイト」診断",
            "description": "70億人の中にたった一人。あなたの魂の片割れ「ソウルメイト」の特徴、出会う時期、そして現在の距離を鑑定します。",
            "price": 150,
            "themeColor": "#ec4899",
            "themeGradient": "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
            "stripeUrl": "https://buy.stripe.com/5kQ5kDcp27Y38MV9Xx8EM02"
        },
        "questions": [
            { "id": "q1", "text": "初対面なのに「懐かしい」と感じたことはある？", "options": [{ "label": "よくある。直感を信じる方", "score": { "twinray": 3, "soulmate": 1, "karmamate": 0 } }, { "label": "たまにあるけど気のせいだと思う", "score": { "twinray": 1, "soulmate": 2, "karmamate": 1 } }, { "label": "全くない。論理的に考える", "score": { "twinray": 0, "soulmate": 0, "karmamate": 3 } }] },
            { "id": "q2", "text": "理想の恋愛関係は？", "options": [{ "label": "言葉がなくても通じ合える関係", "score": { "twinray": 3, "soulmate": 1, "karmamate": 0 } }, { "label": "互いに高め合い成長できる関係", "score": { "twinray": 1, "soulmate": 3, "karmamate": 0 } }, { "label": "刺激的で情熱的な関係", "score": { "twinray": 0, "soulmate": 0, "karmamate": 3 } }] },
            { "id": "q3", "text": "過去の失恋パターンは？", "options": [{ "label": "なぜか突然音信不通になる", "score": { "twinray": 2, "soulmate": 0, "karmamate": 2 } }, { "label": "価値観の違いで話し合って別れる", "score": { "twinray": 0, "soulmate": 3, "karmamate": 0 } }, { "label": "激しい喧嘩や浮気で泥沼", "score": { "twinray": 0, "soulmate": 0, "karmamate": 3 } }] },
            { "id": "q4", "text": "自分の性格で直したいところは？", "options": [{ "label": "繊細すぎて傷つきやすい", "score": { "twinray": 3, "soulmate": 0, "karmamate": 0 } }, { "label": "頑固で素直になれない", "score": { "twinray": 0, "soulmate": 2, "karmamate": 1 } }, { "label": "依存心が強く寂しがり屋", "score": { "twinray": 1, "soulmate": 0, "karmamate": 3 } }] },
            { "id": "q5", "text": "もし相手が遠くへ行くと言ったら？", "options": [{ "label": "運命ならまた会えると信じて待つ", "score": { "twinray": 3, "soulmate": 1, "karmamate": 0 } }, { "label": "自分もついていく準備をする", "score": { "twinray": 1, "soulmate": 3, "karmamate": 0 } }, { "label": "不安で引き止めてしまう", "score": { "twinray": 0, "soulmate": 0, "karmamate": 3 } }] },
            { "id": "q6", "text": "夢をよく見る？", "options": [{ "label": "カラーの鮮明な夢をよく見る", "score": { "twinray": 3, "soulmate": 1, "karmamate": 0 } }, { "label": "たまに見るが内容は忘れる", "score": { "twinray": 1, "soulmate": 2, "karmamate": 1 } }, { "label": "ほとんど見ない・覚えていない", "score": { "twinray": 0, "soulmate": 1, "karmamate": 3 } }] },
            { "id": "q7", "text": "「愛」とは何だと思う？", "options": [{ "label": "無条件の奉仕・許し", "score": { "twinray": 3, "soulmate": 0, "karmamate": 0 } }, { "label": "信頼と尊敬の積み重ね", "score": { "twinray": 0, "soulmate": 3, "karmamate": 0 } }, { "label": "奪い合い、求め合うもの", "score": { "twinray": 0, "soulmate": 0, "karmamate": 3 } }] }
        ],
        "results": {
            "twinray": { "title": "魂の片割れ「ツインレイ」タイプ", "image": "https://dummyimage.com/600x400/f472b6/fff&text=Twin+Ray", "short_desc": "あなたには、前世で一つの魂だった「唯一無二の相手」が既に存在しています。", "teaser": "強く惹かれ合いながらも、なぜか結ばれない…「サイレント期間」と呼ばれる統合への試練かもしれません。", "details": [{ "heading": "🔮 運命の相手の特徴", "content": "あなたのツインレイは、初対面なのに「どこかで会ったことがある」と感じる相手です。外見のタイプは理想と違うかもしれませんが、瞳の奥に自分と同じ光を感じます。" }, { "heading": "⚡ 出会いの時期と予兆", "content": "あなたが「人生どん底」と感じる時、あるいは「もう恋愛なんていいや」と執着を手放した瞬間に、その人は現れます。相手はあなたのトラウマや弱点を容赦なく刺激してきます。" }, { "heading": "💞 結ばれるための条件", "content": "ツインレイと統合するためには、「精神的自立」が絶対条件です。相手に幸せにしてもらおうとする依存心を捨て、一人でも輝けるようになった時、パズルのピースがハマるように二人の運命が重なります。" }] },
            "soulmate": { "title": "深い絆で結ばれた「ソウルメイト」タイプ", "image": "https://dummyimage.com/600x400/fbcfe8/fff&text=Soulmate", "short_desc": "互いに理解し合い、助け合うことができる最高のパートナーとの出会いが待っています。", "teaser": "ドキドキするような刺激的な恋ではありませんが、家族のように安心できる温かい愛。それがあなたの求める本当の幸せです。", "details": [{ "heading": "🔮 運命の相手の特徴", "content": "言葉を交わさなくても考えていることがわかる、空気のような存在感の異性です。共通の趣味や価値観を持っており、一緒にいて全く疲れません。" }, { "heading": "⚡ 出会いの時期と予兆", "content": "あなたが自分らしくリラックスして過ごしている時、ふとした瞬間に隣にいます。ドラマチックな展開ではなく、気づいたら付き合っていた、というような自然な流れで進展します。" }, { "heading": "💞 幸せを掴むアクション", "content": "自分を飾らず、素直な気持ちを表現することを心がけてください。ソウルメイトはあなたの「弱さ」すらも愛してくれます。" }] },
            "karmamate": { "title": "業を背負った「カルマメイト」タイプ", "image": "https://dummyimage.com/600x400/be185d/fff&text=Karma+Mate", "short_desc": "強烈に惹かれ合うものの、傷つけ合う関係。前世からの因縁を解消するための相手です。", "teaser": "「離れたいのに離れられない」そんな腐れ縁に苦しんでいませんか？その相手は、あなたに重要な課題を突きつけるために現れたのです。", "details": [{ "heading": "🔮 運命の相手の特徴", "content": "出会った瞬間に電撃が走るような、情熱的で危険な魅力を持った相手です。しかし、嫉妬、束縛、裏切りなど、ネガティブな感情を常に引き出されます。" }, { "heading": "⚡ 今後の展開と警告", "content": "この関係は、あなたが「自分を大切にする」ことを学ぶために用意されました。相手に尽くしすぎてボロボロになる前に、勇気を持って「NO」と言う必要があります。" }, { "heading": "💞 負の連鎖を断ち切る方法", "content": "執着を捨てることです。「この人がいないと生きていけない」は幻想です。物理的に距離を置き、趣味や仕事に没頭してください。" }] }
        }
    },
    // Money01 (Partial Recovery)
    "money01": {
        "meta": {
            "title": "隠された「金運」と生涯年収診断",
            "description": "あなたはお金に好かれる体質？それとも…？隠れた財産運と、生涯で稼ぐ推定金額、金運アップの秘儀を伝授します。",
            "price": 150,
            "themeColor": "#eab308",
            "stripeUrl": "https://buy.stripe.com/5kQ5kDcp27Y38MV9Xx8EM02"
        },
        "questions": [
            { "id": "q1", "text": "お財布の状態、一番近いのは？", "options": [{ "label": "レシートでパンパン、小銭が多い", "score": { "poor": 3, "standard": 0, "rich": 0 } }, { "label": "整理されているが、古い財布", "score": { "poor": 1, "standard": 3, "rich": 0 } }, { "label": "長財布で、お札の向きが揃っている", "score": { "poor": 0, "standard": 0, "rich": 3 } }] },
            { "id": "q2", "text": "コンビニに入るとつい…", "options": [{ "label": "予定にないお菓子を買ってしまう", "score": { "poor": 3, "standard": 1, "rich": 0 } }, { "label": "必要なものだけ買って出る", "score": { "poor": 0, "standard": 3, "rich": 1 } }, { "label": "新商品や価格をチェックするだけ", "score": { "poor": 0, "standard": 1, "rich": 3 } }] },
            { "id": "q3", "text": "「お金」に対するイメージは？", "options": [{ "label": "使えば減るもの、苦労して稼ぐもの", "score": { "poor": 3, "standard": 1, "rich": 0 } }, { "label": "生活に必要な道具", "score": { "poor": 0, "standard": 3, "rich": 0 } }, { "label": "自由を得るためのパスポート", "score": { "poor": 0, "standard": 0, "rich": 3 } }] },
            { "id": "q4", "text": "友人が成功して大金ちになったら？", "options": [{ "label": "素直に羨ましい、嫉妬してしまう", "score": { "poor": 3, "standard": 1, "rich": 0 } }, { "label": "「すごいね」と祝福する", "score": { "poor": 0, "standard": 3, "rich": 1 } }, { "label": "どうやったのか方法を聞き出す", "score": { "poor": 0, "standard": 0, "rich": 3 } }] },
            { "id": "q5", "text": "トイレ掃除の頻度は？", "options": [{ "label": "汚れが目立ってきたらやる", "score": { "poor": 2, "standard": 2, "rich": 0 } }, { "label": "週に1回は必ずやる", "score": { "poor": 1, "standard": 3, "rich": 1 } }, { "label": "毎日ピカピカに磨いている", "score": { "poor": 0, "standard": 0, "rich": 3 } }] },
            { "id": "q6", "text": "投資についてどう思う？", "options": [{ "label": "ギャンブルみたいで怖い", "score": { "poor": 3, "standard": 1, "rich": 0 } }, { "label": "NISAなどは始めている", "score": { "poor": 0, "standard": 2, "rich": 2 } }, { "label": "お金に働かせるのは当然だ", "score": { "poor": 0, "standard": 0, "rich": 3 } }] },
            { "id": "q7", "text": "100万円あったら何に使う？", "options": [{ "label": "欲しかったブランド品を買う", "score": { "poor": 3, "standard": 0, "rich": 0 } }, { "label": "半分貯金して半分旅行へ", "score": { "poor": 1, "standard": 3, "rich": 1 } }, { "label": "自分のスキルアップに全額投資", "score": { "poor": 0, "standard": 0, "rich": 3 } }] }
        ],
        "results": {
            "rich": {
                "title": "金運の帝王「ミリオネア」タイプ",
                "image": "https://dummyimage.com/600x400/eab308/fff&text=Millionaire",
                "short_desc": "あなたはお金に愛されています。生涯年収は【5億円オーバー】も夢ではありません。",
                "teaser": "圧倒的な金運を持っていますが、実は「ある落とし穴」に気づかないと、一晩ですべてを失う危険性があります。資産を守るための鉄則とは…",
                "details": [
                    { "heading": "💰 隠された金財運", "content": "あなたは生まれながらにして「富を引き寄せる磁石」のようなオーラを持っています。お金を汚いものと思わず、ポジティブなエネルギーとして循環させる才能があります。" }
                ]
            },
            "standard": {
                "title": "堅実な「資産家」タイプ",
                "image": "https://dummyimage.com/600x400/ccc/000&text=Standard",
                "short_desc": "Coming Soon...",
                "teaser": "Coming Soon...",
                "details": [{ "heading": "詳細", "content": "準備中です" }]
            },
            "poor": {
                "title": "浪費注意の「貧乏神」タイプ",
                "image": "https://dummyimage.com/600x400/ccc/000&text=Poor",
                "short_desc": "Coming Soon...",
                "teaser": "Coming Soon...",
                "details": [{ "heading": "詳細", "content": "準備中です" }]
            }
        }
    },
    // Spirit10 (Partial Questions, Full Results)
    "spirit10": {
        "meta": {
            "title": "あなたがこの世に生まれた「真の使命（ソウルパーパス）」",
            "description": "何のために生まれてきたのか。あなたの魂が設定してきた「今世のミッション」と「到達点」を明らかにします。",
            "price": 150,
            "themeColor": "#facc15",
            "themeGradient": "linear-gradient(135deg, #fde047 0%, #facc15 100%)",
            "stripeUrl": "https://buy.stripe.com/5kQ5kDcp27Y38MV9Xx8EM02"
        },
        "questions": [
            { "id": "q1", "text": "（修復中：質問データ欠損）", "options": [{ "label": "選択A", "score": { "money": 1, "human": 0, "dream": 0 } }, { "label": "選択B", "score": { "money": 0, "human": 1, "dream": 0 } }] },
            { "id": "q7", "text": "最期はどうありたい？", "options": [{ "label": "豪邸で死にたい", "score": { "money": 3, "human": 0, "dream": 0 } }, { "label": "みんなに囲まれて死にたい", "score": { "money": 0, "human": 3, "dream": 0 } }, { "label": "何かを残して死にたい", "score": { "money": 0, "human": 0, "dream": 3 } }] }
        ],
        "results": {
            "money": {
                "title": "崩壊トリガー：【経済的破綻】「貧困への恐怖」",
                "image": "https://dummyimage.com/600x400/1e293b/fff&text=Bankruptcy",
                "short_desc": "あなたのメンタルは「金」と直結しています。失業や借金など、生活水準が下がった瞬間に、生きる気力を完全に失います。",
                "teaser": "プライドが高いので、「落ちぶれた自分」を許せません。ホームレスになるくらいなら…と思い詰めるタイプです。",
                "details": [
                    { "heading": "📉 限界突破の日", "content": "リストラ、事業の失敗、あるいは連帯保証人などのトラブルで、全財産を失った日です。あなたは「お金＝自分の価値」だと思っているため、無一文になった瞬間、アイデンティティが崩壊します。" },
                    { "heading": "🛡️ 防衛策", "content": "「お金がなくなっても、命までは取られない」という図太さを持つことです。副業やスキルへの投資で収入源を複数持っておくことは、心の安定剤になります。" }
                ]
            },
            "human": {
                "title": "崩壊トリガー：【孤独と絶縁】「村八分」",
                "image": "https://dummyimage.com/600x400/312e81/fff&text=Isolation",
                "short_desc": "あなたは一人では生きられません。パートナーの裏切りや、コミュニティからの追放が、精神の死を意味します。",
                "teaser": "「誰からも必要とされていない」と感じた時、あなたの世界は色を失います。孤独こそが猛毒です。",
                "details": [
                    { "heading": "📉 限界突破の日", "content": "信じていたパートナーの不倫、離婚、あるいはSNSでの炎上や職場のいじめで孤立した時です。あなたは他人からの評価で自分を保っているため、それが「拒絶」に変わるとパニックを起こします。" },
                    { "heading": "🛡️ 防衛策", "content": "「自分一人でも楽しめる時間」を作ることです。他人はコントロールできません。依存先を分散させ（家族、趣味の友達、行きつけの店など）、一つの関係が切れても他がある、という状態を作っておくことが命綱になります。" }
                ]
            },
            "dream": {
                "title": "崩壊トリガー：【才能の枯渇】「夢の終わり」",
                "image": "https://dummyimage.com/600x400/000000/fff&text=Dream+Over",
                "short_desc": "あなたは理想主義者です。「自分は特別だ」という魔法が解けた時、現実の重さに耐えきれずに潰れます。",
                "teaser": "「自分には才能がない」と認める瞬間。それがあなたの人生の終了時刻です。凡人として生きる苦痛は死に勝ります。",
                "details": [
                    { "heading": "📉 限界突破の日", "content": "全力で挑んだ勝負に負けた時、あるいは自分より若くて才能のある人間に圧倒的な差を見せつけられた時です。「何者か」になりたかったあなたが、「何者でもない自分」を受け入れなければならない時、心がポッキリと折れます。" },
                    { "heading": "🛡️ 防衛策", "content": "「結果ではなくプロセス」を楽しむマインドに切り替えることです。成功しなくても、好きなことをやっている時間そのものが幸せだ、と思えるようになれば無敵です。「特別」でなくても、あなたは十分に価値があります。" }
                ]
            }
        }
    }
};

// 2. Parse Master List
const themes = {};
const lines = masterList.split('\n');
lines.forEach(line => {
    let match = line.match(/^\d+\.\s*(.+?)\s*\((.+?)\)$/);
    if (match) {
        const title = match[1];
        const code = match[2];

        if (recovered[code]) {
            themes[code] = recovered[code];
        } else {
            // Placeholder Generator
            themes[code] = {
                "meta": {
                    "title": title,
                    "description": "（自動生成）" + title + "についての診断です。",
                    "price": 150,
                    "themeColor": "#64748b",
                    "themeGradient": "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
                    "stripeUrl": "https://buy.stripe.com/5kQ5kDcp27Y38MV9Xx8EM02"
                },
                "questions": [
                    { "id": "q1", "text": "詳細な質問は現在準備中です。", "options": [{ "label": "選択肢A", "score": { "A": 1 } }, { "label": "選択肢B", "score": { "B": 1 } }] }
                ],
                "results": {
                    "A": {
                        "title": "タイプA",
                        "image": "https://dummyimage.com/600x400/ccc/000&text=Type+A",
                        "short_desc": "準備中",
                        "teaser": "Coming Soon...",
                        "details": [{ "heading": "詳細", "content": "このテーマは現在コンテンツ準備中です。" }]
                    },
                    "B": {
                        "title": "タイプB",
                        "image": "https://dummyimage.com/600x400/ccc/000&text=Type+B",
                        "short_desc": "準備中",
                        "teaser": "Coming Soon...",
                        "details": [{ "heading": "詳細", "content": "このテーマは現在コンテンツ準備中です。" }]
                    }
                }
            };
        }
    }
});

// Add 'onsen' if not in list (it is not in the numbered list usually)
if (!themes['onsen']) themes['onsen'] = recovered['onsen'];

// 3. Write
fs.writeFileSync('themes.json', JSON.stringify(themes, null, 4));
console.log(`Reconstructed ${Object.keys(themes).length} themes.`);
