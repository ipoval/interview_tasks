#!/usr/bin/env ruby

# encoding: utf-8

# longest_blended_word.rb - Find Longest Word Made of Other Words
# To: asperasoft.com interview
# Revision: 2013-08-13 22:20:14Z
# Copyright (C) 2013 @ipoval, ipoval@ya.ru

require 'set'

class LongestBlendedWord
  attr_accessor :blends, :top_blends, :blends_count, :dictionary_path

  def initialize(_dictionary_path)
    fail ArgumentError, "#{_dictionary_path} not found" unless File.exists?(_dictionary_path)

    @dictionary_path = _dictionary_path
    @blends_count    = 0
    @top_blends      = []
    @blends          = Hash.new { |h, k| h[k] = [] }
  end

  def find_longest_word
    blends_from_dictionary
    aggregate_blends
  end

  def blends_from_dictionary
    dictionary_by_size.each do |word|
      next unless word_split? word
      subwords(min, @current_word = word, corehead = nil)
    end
  end

  def aggregate_blends
    blends.each { |word, splits|
      splits.each { |split|
        if all_words_in_dictionary? split
          self.blends_count += 1
          top_blends << word.dup if top_blends[1].nil?
          break
        end
      }
    }

    { top_blends: top_blends, blends_count: blends_count }
  end

  private

  def subwords(s, word, corehead)
    s.upto(word.size - min) do |i|
      head, tail = word[0...i], word[i..-1]

      next unless memoized_word_in_dictionary? head

      prefix = [corehead, head].compact
      @blends[@current_word] << [prefix, tail].flatten

      word_split?(tail) ? subwords(s, tail, prefix) : next
    end
  end

  def all_words_in_dictionary?(words)
    words.detect { |word| ! memoized_word_in_dictionary?(word) }.nil?
  end

  def memoized_word_in_dictionary?(word)
    @dictionary_map ||= {}
    @dictionary_map.fetch(word) { @dictionary_map[word] = dictionary_by_alphanumeric.include?(word) }
  end

  def word_split?(word); word.size >= min * 2; end

  def min; @min ||= dictionary_by_size.last.size; end

  def dictionary_by_size
    @dictionary_by_size ||= dictionary_by_alphanumeric.sort { |w1, w2| w2.size <=> w1.size }.freeze
  end

  def dictionary_by_alphanumeric
    @dictionary_by_alphanumeric ||= Set.new File.read(dictionary_path).strip.split
  end
end

#
if __FILE__ == $0

puts 'Result:'
begin
#  GC.disable
  p LongestBlendedWord.new('./../wordsforproblem.txt').find_longest_word
ensure
#  GC.enable
#  GC.start
end
# puts GC.count

end

__END__

→ time ruby longest_blended_word.rb 
Result:
{:top_blends=>["ethylenediaminetetraacetates", "ethylenediaminetetraacetate"], :blends_count=>97107}

real	0m6.894s
user	0m6.712s
sys	0m0.172s
