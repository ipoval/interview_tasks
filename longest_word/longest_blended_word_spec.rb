require_relative 'longest_blended_word'

describe LongestBlendedWord do
  let(:words) { %w{cat cats catsdogcats catxdogcatsrat dog dogcatsdog hippopotamuses rat ratcatdogcat} }
  let(:longest_blended_word) {
    LongestBlendedWord.new('/dev/null').tap { |_let| _let.stub(dictionary_by_alphanumeric: words) }
  }

  describe '#initialize with path to dictionary' do
    let(:wrong_path) { '/dev/notexistingpath' }

    specify 'fails if path does not exist' do
      expect { LongestBlendedWord.new(wrong_path) }.to raise_error ArgumentError, "#{wrong_path} not found"
    end
  end

  describe '#blends_from_dictionary' do
    specify 'constructs map of words and blends w. min guarantee that words exist in dictionary' do
      longest_blended_word.blends_from_dictionary

      expect(longest_blended_word.blends).to include *%w(catxdogcatsrat ratcatdogcat catsdogcats dogcatsdog)
    end
  end

  describe '#find_longest_word' do
    specify 'given a constructed map of blends, find the longest blended word and total count of blends' do
      longest_blended_word.blends_from_dictionary

      result = longest_blended_word.find_longest_word

      expect(result).to eq({ top_blends: %w(ratcatdogcat catsdogcats), blends_count: 3 })
    end
  end

end
