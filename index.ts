type 左 = 0;
type 価値 = 1;
type 右 = 2;

type リスト = ReadonlyArray<unknown>;

type インクリメント<番号 extends リスト> = [...番号, unknown];
type デクリメント<番号 extends リスト> = 番号 extends readonly [...infer 頭, any] ? 頭 : never;

type ノード = [左: ノード | undefined, 価値: number, 右: ノード | undefined];

type 最大<前 extends リスト, 後 extends リスト> = 前 extends readonly [...後, ...any[]] ? 前 : 後;

type 身長<根 extends ノード | undefined> =
    [根] extends [ノード]
        ? 最大<インクリメント<身長<根[左]>>, インクリメント<身長<根[右]>>>
        : [];

type 逆レベル順トラバーサル<根 extends ノード | undefined, ルートの高さ extends リスト = 身長<根>, 結果 extends リスト = []> =
    ルートの高さ["length"] extends 0
        ? 結果
        : 逆レベル順トラバーサル<根, デクリメント<ルートの高さ>, [...結果, ...取得レベル<根, ルートの高さ>]>

type 取得レベル<根 extends ノード | undefined, レベル extends リスト> =
    [根] extends [ノード]
        ? レベル extends readonly [unknown]
            ? [根[価値]]
            : [...取得レベル<根[左], デクリメント<レベル>>, ...取得レベル<根[右], デクリメント<レベル>>]
        : [];
