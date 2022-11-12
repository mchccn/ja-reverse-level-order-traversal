type LEFT = 0;
type VALUE = 1;
type RIGHT = 2;

type List = ReadonlyArray<unknown>;

type Increment<N extends List> = [...N, unknown];
type Decrement<N extends List> = N extends readonly [...infer R, any] ? R : never;

type Deno = [LEFT: Deno | undefined, VALUE: number, RIGHT: Deno | undefined];

type Max<A extends List, B extends List> = A extends readonly [...B, ...any[]] ? A : B;

type Height<Root extends Deno | undefined> =
    [Root] extends [Deno]
        ? Max<Increment<Height<Root[LEFT]>>, Increment<Height<Root[RIGHT]>>>
        : [];

type ReverseLevelOrderTraversal<Root extends Deno | undefined, Depth extends List = Height<Root>, Result extends List = []> =
    Depth["length"] extends 0
        ? Result
        : ReverseLevelOrderTraversal<Root, Decrement<Depth>, [...Result, ...GetLevel<Root, Depth>]>

type GetLevel<Root extends Deno | undefined, Depth extends List> =
    [Root] extends [Deno]
        ? Depth extends readonly [unknown]
            ? [Root[VALUE]]
            : [...GetLevel<Root[LEFT], Decrement<Depth>>, ...GetLevel<Root[RIGHT], Decrement<Depth>>]
        : [];
