interface WordContainerProps {
    symbol: string | undefined;
}

const WordSymbol = ({ symbol }: WordContainerProps) => {
    if (symbol && symbol.endsWith(".png")) {
        return (
            <div style={{ objectFit: "contain" }}>
                <img
                    src={symbol}
                    style={{
                        height: 60
                    }}
                />
            </div>
        );
    }

    return (
        <div>
            {symbol}
        </div>
    );
};

export default WordSymbol;
