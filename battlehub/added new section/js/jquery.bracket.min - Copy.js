var __extends = this && this.__extends || function (t, e) {
	function n() {
		this.constructor = t
	}
	for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
	t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
};
! function (t) {
	function e(t) {
		return !isNaN(parseFloat(t)) && isFinite(t)
	}

	function n() {
		this.message = "Root of information for this team", this.name = "EndOfBranchException"
	}

	function r(e, n, r) {
		var i = r.find(".team[data-teamid=" + e + "]"),
			o = n || "highlight";
		return {
			highlight: function () {
				i.each(function () {
					t(this).addClass(o), t(this).hasClass("win") && t(this).parent().find(".connector").addClass(o)
				})
			},
			deHighlight: function () {
				i.each(function () {
					t(this).removeClass(o), t(this).parent().find(".connector").removeClass(o)
				})
			}
		}
	}

	function i(e, n, r) {
		var i = t('<input type="text">');
		i.val(n), e.empty().append(i), i.focus(), i.blur(function () {
			r(i.val())
		}), i.keydown(function (t) {
			var e = t.keyCode || t.which;
			9 !== e && 13 !== e && 27 !== e || (t.preventDefault(), r(i.val(), 27 !== e))
		})
	}

	function o(t, e, n, r) {
		switch (r) {
		case "empty-bye":
			return void t.append("BYE");
		case "empty-tbd":
			return void t.append("TBD");
		case "entry-no-score":
		case "entry-default-win":
		case "entry-complete":
			return void t.append(e)
		}
	}

	function s(t) {
		var e = t.el;
		return e.find(".team.win").append('<div class="bubble">1st <i class="fa fa-edit" style="color:red;"></i></div>'), e.find(".team.lose").append('<div class="bubble">2nd<i class="fa fa-edit" style="color:red;"></i></div>'), !0
		
	}

	function a(t) {
		var e = t.el;
		return e.find(".team.win").append('<div class="bubble third">3rd</div>'), e.find(".team.lose").append('<div class="bubble fourth">4th</div>'), !0
	}

	function h(e) {
		var n = t.extend(!0, {}, e);
		return n.teams = n.teams.map(function (t) {
			return t.map(function (t) {
				return t.toNull()
			})
		}), n.results = n.results.map(function (t) {
			return t.map(function (t) {
				return t.map(function (t) {
					var e = [t.first.toNull(), t.second.toNull()];
					return void 0 !== t.userData && e.push(t.userData), e
				})
			})
		}), n
	}

	function c(n, r, i, o, s, a, h, c, l, m) {
		var f = i.name.isEmpty() || o.name.isEmpty() ? "" : 'data-resultid="result-' + c.getNext() + '"',
			g = t('<div class="score" style="width: ' + h.scoreWidth + 'px;" ' + f + "></div>"),
			b = i.name.isEmpty() || o.name.isEmpty() || !s ? p.empty() : i.score.map(function (t) {
				return "" + t
			}),
			y = b.orElse("--");
		g.text(y);
		var v = i.name.map(function () {
				return b.map(function () {
					return "entry-complete"
				}).orElseGet(function () {
					return o.emptyBranch() === u.BYE ? "entry-default-win" : "entry-no-score"
				})
			}).orElseGet(function () {
				var t = i.emptyBranch();
				switch (t) {
				case u.BYE:
					return "empty-bye";
				case u.TBD:
					return "empty-tbd";
				default:
					throw new Error("Unexpected branch type " + t)
				}
			}),
			C = t('<div class="team" style="width: ' + (h.teamWidth + h.scoreWidth) + 'px;"></div>'),
			w = t('<div class="label" style="width: ' + h.teamWidth + 'px;"></div>').appendTo(C);
		if (h.decorator.render(w, i.name.toNull(), y, v), i.seed.forEach(function (t) {
			C.attr("data-teamid", t)
		}), i.name.isEmpty() ? C.addClass("na") : r.winner().name === i.name ? C.addClass("win") : r.loser().name === i.name && C.addClass("lose"), C.append(g), (!i.name.isEmpty() || i.name.isEmpty() && 0 === n && a) && "function" == typeof h.save && (h.disableTeamEdit || (w.addClass("editable"), w.click(function () {
			var e = t(this);
			! function r() {
				e.unbind(), h.decorator.edit(e, i.name.toNull(), function (o, s) {
					var a = i.seed.get();
					h.init.teams[~~(a / 2)][a % 2] = p.of(o || null), m(!0), e.click(r);
					var c = h.el.find(".team[data-teamid=" + (a + 1) + "] div.label:first");
					c.length && !0 === s && 0 === n && t(c).click()
				})
			}()
		})), !i.name.isEmpty() && !o.name.isEmpty() && s)) {
			var k = c.get();
			g.addClass("editable"), g.click(function () {
				var n = t(this);
				! function r() {
					n.unbind();
					var o = e(i.score) ? n.text() : "0",
						s = t('<input type="text">');
					s.val(o), n.empty().append(s), s.focus().select(), s.keydown(function (n) {
						e(t(this).val()) ? t(this).removeClass("error") : t(this).addClass("error");
						var r = n.keyCode || n.which;
						if (9 === r || 13 === r || 27 === r) {
							if (n.preventDefault(), t(this).blur(), 27 === r) return;
							var i = l.find("div.score[data-resultid=result-" + (k + 1) + "]");
							i && i.click()
						}
					}), s.blur(function () {
						var t = s.val();
						t && e(t) || e(i.score) ? t && e(t) || !e(i.score) || (t = i.score) : t = "0", n.html(t), e(t) && (i.score = d.of(parseInt(t, 10)), m(!0)), n.click(r)
					})
				}()
			})
		}
		return C
	}
	var u, l, p = function () {
			function t(e) {
				if (this.val = e, e instanceof t) throw new Error("Trying to wrap Option into an Option");
				if (void 0 === this.val) throw new Error("Option cannot contain undefined")
			}
			return t.of = function (e) {
				return new t(e)
			}, t.empty = function () {
				return new t(null)
			}, t.prototype.get = function () {
				if (null === this.val) throw new Error("Trying to get() empty Option");
				return this.val
			}, t.prototype.orElse = function (t) {
				return null === this.val ? t : this.val
			}, t.prototype.orElseGet = function (t) {
				return null === this.val ? t() : this.val
			}, t.prototype.map = function (e) {
				return null === this.val ? t.empty() : new t(e(this.val))
			}, t.prototype.forEach = function (t) {
				return null !== this.val && t(this.val), this
			}, t.prototype.toNull = function () {
				return null === this.val ? null : this.val
			}, t.prototype.isEmpty = function () {
				return null === this.val
			}, t
		}(),
		d = function (t) {
			function e() {
				t.apply(this, arguments)
			}
			return __extends(e, t), e.of = function (t) {
				var e = typeof t;
				if (null !== t && "number" !== e) throw new Error("Invalid score format, expected number, got " + e);
				return p.of(t)
			}, e.empty = function () {
				return p.empty()
			}, e
		}(p),
		m = function () {
			return function (t, e, n) {
				if (this.first = t, this.second = e, this.userData = n, !t || !e) throw new Error("Cannot create ResultObject with undefined scores")
			}
		}();
	(l = u || (u = {}))[l.TBD = 0] = "TBD", l[l.BYE = 1] = "BYE";
	var f = function () {
			function t(t) {
				this.isFirst = t
			}
			return t.first = function () {
				return new t(!0)
			}, t.second = function () {
				return new t(!1)
			}, t.prototype.map = function (t, e) {
				return this.isFirst ? t : e
			}, t
		}(),
		g = function () {
			function t(t, e, n, r, i) {
				this.source = t, this.name = e, this.order = n, this.seed = r, this.score = i
			}
			return t.prototype.emptyBranch = function () {
				if (!this.name.isEmpty()) return u.TBD;
				try {
					return this.source().emptyBranch()
				} catch (t) {
					if (t instanceof n) return u.BYE;
					throw new Error("Unexpected exception type")
				}
			}, t
		}(),
		b = function () {
			function t(t, e) {
				this.a = t, this.b = e
			}
			return t.teamsInResultOrder = function (t) {
				var e = t.a.name.isEmpty(),
					n = t.b.name.isEmpty();
				if (n && !e) return t.b.emptyBranch() === u.BYE ? [t.a, t.b] : [];
				if (e && !n) return t.a.emptyBranch() === u.BYE ? [t.b, t.a] : [];
				if (!t.a.score.isEmpty() && !t.b.score.isEmpty()) {
					if (t.a.score.get() > t.b.score.get()) return [t.a, t.b];
					if (t.a.score.get() < t.b.score.get()) return [t.b, t.a]
				}
				return []
			}, t.emptyTeam = function (t) {
				return new g(t, p.empty(), p.empty(), p.empty(), d.empty())
			}, t.prototype.winner = function () {
				return t.teamsInResultOrder(this)[0] || t.emptyTeam(this.a.source)
			}, t.prototype.loser = function () {
				return t.teamsInResultOrder(this)[1] || t.emptyTeam(this.a.source)
			}, t
		}(),
		y = function (t, e) {
			return function () {
				return [{
					source: function () {
						return new g(function () {
							throw new n
						}, t[e][0], p.of(f.first()), p.of(2 * e), d.empty())
					}
				}, {
					source: function () {
						return new g(function () {
							throw new n
						}, t[e][1], p.of(f.second()), p.of(2 * e + 1), d.empty())
					}
				}]
			}
		},
		v = function (t, e) {
			return function (n) {
				n.css("top", ""), n.css("position", "absolute"), e ? n.css("top", t.el.height() / 2 - n.height() / 2 + "px") : n.css("bottom", -n.height() / 2 + "px")
			}
		},
		C = function (t, e, n, r, i, o) {
			return function () {
				if (i % 2 == 0 && 0 === o) return [{
					source: function () {
						return t.round(0).match(2 * r).loser()
					}
				}, {
					source: function () {
						return t.round(0).match(2 * r + 1).loser()
					}
				}];
				var s = o % 2 == 0 ? n - r - 1 : r;
				return [{
					source: function () {
						return e.round(2 * o).match(r).winner()
					}
				}, {
					source: function () {
						return t.round(o + 1).match(s).loser()
					}
				}]
			}
		},
		w = function (t, e) {
			return function () {
				return t.css("top", e.el.height() / 2 - t.height() / 2 + "px")
			}
		},
		k = function () {
			function e(e, n, r, i, o, s, a, h) {
				this.bracket = e, this.previousRound = n, this.roundNumber = r, this._results = i, this.doRenderCb = o, this.mkMatch = s, this.isFirstBracket = a, this.opts = h, this.containerWidth = this.opts.teamWidth + this.opts.scoreWidth, this.roundCon = t('<div class="round" style="width: ' + this.containerWidth + "px; margin-right: " + this.opts.roundMargin + 'px"/>'), this.matches = []
			}
			return Object.defineProperty(e.prototype, "el", {
				get: function () {
					return this.roundCon
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.addMatch = function (t, e) {
				var n = this,
					r = this.matches.length,
					i = null !== t ? t() : [{
						source: function () {
							return n.bracket.round(n.roundNumber - 1).match(2 * r).winner()
						}
					}, {
						source: function () {
							return n.bracket.round(n.roundNumber - 1).match(2 * r + 1).winner()
						}
					}],
					o = function () {
						return i[0].source()
					},
					s = function () {
						return i[1].source()
					},
					a = new b(new g(o, o().name, p.of(f.first()), o().seed, d.empty()), new g(s, s().name, p.of(f.second()), s().seed, d.empty())),
					h = this.mkMatch(this, a, r, this._results.map(function (t) {
						return void 0 === t[r] ? null : t[r]
					}), e, this.isFirstBracket, this.opts);
				return this.matches.push(h), h
			}, e.prototype.match = function (t) {
				return this.matches[t]
			}, e.prototype.prev = function () {
				return this.previousRound
			}, e.prototype.size = function () {
				return this.matches.length
			}, e.prototype.render = function () {
				this.roundCon.empty(), (this.doRenderCb.isEmpty() || this.doRenderCb.get()()) && (this.roundCon.appendTo(this.bracket.el), this.matches.forEach(function (t) {
					return t.render()
				}))
			}, e.prototype.results = function () {
				return this.matches.reduce(function (t, e) {
					return t.concat([e.results()])
				}, [])
			}, e
		}(),
		E = function () {
			function t(t, e, n, r, i) {
				this.bracketCon = t, this.initResults = e, this.mkMatch = n, this.isFirstBracket = r, this.opts = i, this.rounds = []
			}
			return Object.defineProperty(t.prototype, "el", {
				get: function () {
					return this.bracketCon
				},
				enumerable: !0,
				configurable: !0
			}), t.prototype.addRound = function (t) {
				var e = this.rounds.length,
					n = e > 0 ? p.of(this.rounds[e - 1]) : p.empty(),
					r = this.initResults.map(function (t) {
						return void 0 === t[e] ? new m(d.empty(), d.empty(), void 0) : t[e]
					}),
					i = new k(this, n, e, r, t, this.mkMatch, this.isFirstBracket, this.opts);
				return this.rounds.push(i), i
			}, t.prototype.dropRound = function () {
				this.rounds.pop()
			}, t.prototype.round = function (t) {
				return this.rounds[t]
			}, t.prototype.size = function () {
				return this.rounds.length
			}, t.prototype.final = function () {
				return this.rounds[this.rounds.length - 1].match(0)
			}, t.prototype.winner = function () {
				return this.rounds[this.rounds.length - 1].match(0).winner()
			}, t.prototype.loser = function () {
				return this.rounds[this.rounds.length - 1].match(0).loser()
			}, t.prototype.render = function () {
				this.bracketCon.empty();
				for (var t = 0; t < this.rounds.length; t += 1) this.rounds[t].render()
			}, t.prototype.results = function () {
				return this.rounds.reduce(function (t, e) {
					return t.concat([e.results()])
				}, [])
			}, t
		}(),
		M = function () {
			function t() {
				this.counter = 0
			}
			return t.prototype.get = function () {
				return this.counter
			}, t.prototype.getNext = function () {
				return ++this.counter
			}, t.prototype.reset = function () {
				this.counter = 0
			}, t
		}(),
		x = function () {
			function n(n, r, i, o, s, a, h, c, u, l) {
				if (this.round = n, this.match = r, this.seed = i, this.renderCb = s, this.isFirstBracket = a, this.opts = h, this.resultId = c, this.topCon = u, this.renderAll = l, this.connectorCb = p.empty(), this.matchCon = t('<div class="match"></div>'), this.teamCon = t('<div class="teamContainer"></div>'), this.alignCb = null, this.matchUserData = o.isEmpty() ? void 0 : o.get().userData, !h.save) {
					var m = this.matchUserData;
					h.onMatchHover && this.teamCon.hover(function () {
						h.onMatchHover(m, !0)
					}, function () {
						h.onMatchHover(m, !1)
					}), h.onMatchClick && this.teamCon.click(function () {
						h.onMatchClick(m)
					})
				}
				r.a.name = r.a.source().name, r.b.name = r.b.source().name, r.a.score = o.map(function (t) {
					return t.first.toNull()
				}), r.b.score = o.map(function (t) {
					return t.second.toNull()
				}), r.a.name && r.b.name || !e(r.a.score) && !e(r.b.score) || (console.log("ERROR IN SCORE DATA: " + r.a.source().name + ": " + r.a.score + ", " + r.b.source().name + ": " + r.b.score), r.a.score = r.b.score = d.empty())
			}
			return Object.defineProperty(n.prototype, "el", {
				get: function () {
					return this.matchCon
				},
				enumerable: !0,
				configurable: !0
			}), n.prototype.getRound = function () {
				return this.round
			}, n.prototype.setConnectorCb = function (t) {
				this.connectorCb = t
			}, n.prototype.connect = function (e) {
				var n = this,
					r = "lr" === this.opts.dir ? "right" : "left",
					i = this.teamCon.height() / 4,
					o = this.matchCon.height() / 2,
					s = e.map(function (t) {
						return t(n.teamCon, n)
					}).orElseGet(function () {
						return n.seed % 2 == 0 ? n.winner().order.map(function (t) {
							return t.map({
								shift: i * (n.opts.centerConnectors ? 2 : 1),
								height: o
							}, {
								shift: i * (n.opts.centerConnectors ? 2 : 3),
								height: o - i * (n.opts.centerConnectors ? 0 : 2)
							})
						}).orElse({
							shift: 2 * i,
							height: o - i * (n.opts.centerConnectors ? 0 : 1)
						}) : n.winner().order.map(function (t) {
							return t.map({
								shift: -i * (n.opts.centerConnectors ? 2 : 3),
								height: -o + i * (n.opts.centerConnectors ? 0 : 2)
							}, {
								shift: -i * (n.opts.centerConnectors ? 2 : 1),
								height: -o
							})
						}).orElse({
							shift: 2 * -i,
							height: -o + i * (n.opts.centerConnectors ? 0 : 1)
						})
					});
				this.teamCon.append(function (e, n, r, i) {
					var o = n.height,
						s = n.shift,
						a = e / 2,
						h = !0;
					o < 0 && (h = !1, o = -o), o < 2 && (o = 0);
					var c = t('<div class="connector"></div>').appendTo(r);
					c.css("height", o), c.css("width", a + "px"), c.css(i, -a - 2 + "px"), s >= 0 ? c.css("top", s - 1 + "px") : c.css("bottom", -s - 1 + "px"), h ? c.css("border-bottom", "none") : c.css("border-top", "none");
					var u = t('<div class="connector"></div>').appendTo(c);
					return u.css("width", a + "px"), u.css(i, -a + "px"), h ? u.css("bottom", "0px") : u.css("top", "0px"), c
				}(this.opts.roundMargin, s, this.teamCon, r))
			}, n.prototype.winner = function () {
				return this.match.winner()
			}, n.prototype.loser = function () {
				return this.match.loser()
			}, n.prototype.first = function () {
				return this.match.a
			}, n.prototype.second = function () {
				return this.match.b
			}, n.prototype.setAlignCb = function (t) {
				this.alignCb = t
			}, n.prototype.render = function () {
				var t = this;
				this.matchCon.empty(), this.teamCon.empty(), this.match.a.name = this.match.a.source().name, this.match.b.name = this.match.b.source().name, this.match.a.seed = this.match.a.source().seed, this.match.b.seed = this.match.b.source().seed, this.match.a.name.isEmpty() && this.match.b.name.isEmpty() ? this.teamCon.addClass("np") : this.match.winner().name ? this.teamCon.removeClass("np") : this.teamCon.addClass("np");
				var e = !this.match.a.name.isEmpty() && !this.match.b.name.isEmpty();
				this.teamCon.append(c(this.round.roundNumber, this.match, this.match.a, this.match.b, e, this.isFirstBracket, this.opts, this.resultId, this.topCon, this.renderAll)), this.teamCon.append(c(this.round.roundNumber, this.match, this.match.b, this.match.a, e, this.isFirstBracket, this.opts, this.resultId, this.topCon, this.renderAll)), this.matchCon.appendTo(this.round.el), this.matchCon.append(this.teamCon), this.el.css("height", this.round.bracket.el.height() / this.round.size() * 2 + "px"), this.teamCon.css("top", this.el.height() / 2 - this.teamCon.height() / 2 + "px"), null !== this.alignCb && this.alignCb(this.teamCon), this.renderCb.map(function (e) {
					return e(t)
				}).orElse(!1) || this.connect(this.connectorCb)
			}, n.prototype.results = function () {
				return (this.match.a.name.isEmpty() || this.match.b.name.isEmpty()) && (this.match.a.score = this.match.b.score = d.empty()), new m(this.match.a.score, this.match.b.score, this.matchUserData)
			}, n
		}(),
		T = function (t) {
			return void 0 === t ? null : t
		},
		R = function (e) {
			function n() {
				var t = function (t, e, n, r, i) {
					if (e) return Math.log(2 * t) / Math.log(2);
					if (n) return Math.max(2, 2 * (Math.log(2 * t) / Math.log(2) - 1) - 1);
					var o = !r && 3 === i.length && 2 === i[2].length;
					return 2 * (Math.log(2 * t) / Math.log(2) - 1) + 1 + (o ? 1 : 0)
				}(B.teams.length, O, e.skipGrandFinalComeback, e.skipSecondaryFinal, B.results);
				e.disableToolbar ? N.css("width", t * (e.teamWidth + e.scoreWidth + e.roundMargin) + 10) : N.css("width", t * (e.teamWidth + e.scoreWidth + e.roundMargin) + 40), O && B.teams.length <= 2 && !e.skipConsolationRound && N.css("height", F + 40)
			}

			function i(i) {
				var s, a, l, p;
				T.reset(), o.render(), c && c.render(), u && !e.skipGrandFinalComeback && u.render(), e.disableHighlight || (s = N, l = (a = u || o).winner(), p = a.loser(), l && p && (l.name.isEmpty() || r(l.seed.get(), "highlightWinner", s).highlight(), p.name.isEmpty() || r(p.seed.get(), "highlightLoser", s).highlight()), s.find(".team").mouseover(function () {
					var e = t(this).attr("data-teamid");
					if (void 0 !== e) {
						var n = r(parseInt(e, 10), null, s);
						n.highlight(), t(this).mouseout(function () {
							n.deHighlight(), t(this).unbind("mouseout")
						})
					}
				})), i && (B.results[0] = o.results(), c && (B.results[1] = c.results()), u && !e.skipGrandFinalComeback && (B.results[2] = u.results()), n(), e.save && e.save(h(B), e.userData))
			}
			var o, c, u, l, d, m, f, g, b, k, T = new M,
				B = e.init,
				O = B.results.length <= 1,
				F = 45 * B.teams.length + B.teams.length * e.matchMargin,
				N = t('<div class="jQBracket ' + e.dir + '"></div>').appendTo(e.el.empty());
			e.skipSecondaryFinal && O && t.error("skipSecondaryFinal setting is viable only in double elimination mode"), e.disableToolbar || (l = N, d = B, m = e, f = t('<div class="tools"></div>').appendTo(l), t('<span class="increment">+</span>').appendTo(f).click(function () {
				for (var t = d.teams.length, e = 0; e < t; e += 1) d.teams.push([p.empty(), p.empty()]);
				return R(m)
			}), (d.teams.length > 1 && 1 === d.results.length || d.teams.length > 2 && 3 === d.results.length) && t('<span class="decrement">-</span>').appendTo(f).click(function () {
				if (d.teams.length > 1) return d.teams = d.teams.slice(0, d.teams.length / 2), R(m)
			}), 1 === d.results.length && d.teams.length > 1 ? t('<span class="doubleElimination">de</span>').appendTo(f).click(function () {
				if (d.teams.length > 1 && d.results.length < 3) return d.results.push([], []), R(m)
			}) : 3 === d.results.length && d.teams.length > 1 && t('<span class="singleElimination">se</span>').appendTo(f).click(function () {
				if (3 === d.results.length) return d.results = d.results.slice(0, 1), R(m)
			})), O ? b = t('<div class="bracket"></div>').appendTo(N) : (e.skipGrandFinalComeback || (g = t('<div class="finals"></div>').appendTo(N)), b = t('<div class="bracket"></div>').appendTo(N), k = t('<div class="loserBracket"></div>').appendTo(N)), b.css("height", F), k && k.css("height", b.height() / 2), n();
			var W = function (t, e, n, r, o, s, a) {
				return new x(t, e, n, r, o, s, a, T, N, i)
			};
			return o = new E(b, p.of(B.results[0] || null), W, !0, e), O || (c = new E(k, p.of(B.results[1] || null), W, !1, e), e.skipGrandFinalComeback || (u = new E(g, p.of(B.results[2] || null), W, !1, e))),
				function (t, e, n, r, i) {
					for (var o, h = Math.log(2 * e.length) / Math.log(2), c = e.length, u = 0; u < h; u += 1) {
						o = t.addRound(p.empty());
						for (var l = 0; l < c; l += 1) {
							var d = 0 === u ? y(e, l) : null;
							if (u === h - 1 && n || u === h - 1 && i) {
								var m = o.addMatch(d, p.of(s));
								i || m.setAlignCb(v(m, r.skipConsolationRound))
							} else o.addMatch(d, p.empty())
						}
						c /= 2
					}
					if (n && (t.final().setConnectorCb(p.empty()), e.length > 1 && !r.skipConsolationRound)) {
						var f = t.final().getRound().prev(),
							g = f.map(function (t) {
								return function () {
									return t.match(0).loser()
								}
							}).toNull(),
							b = f.map(function (t) {
								return function () {
									return t.match(1).loser()
								}
							}).toNull(),
							C = o.addMatch(function () {
								return [{
									source: g
								}, {
									source: b
								}]
							}, p.of(a));
						C.setAlignCb(function (e) {
							var n = t.el.height() / 2;
							C.el.css("height", n + "px");
							var i = e.height() / 2 + r.matchMargin;
							e.css("top", i + "px")
						}), C.setConnectorCb(p.empty())
					}
				}(o, B.teams, O, e, e.skipGrandFinalComeback && !O), O || (function (t, e, n, r, i) {
					for (var o = Math.log(2 * n) / Math.log(2) - 1, s = n / 2, h = 0; h < o; h += 1) {
						for (var c = r && h === o - 1 ? 1 : 2, u = 0; u < c; u += 1)
							for (var l = e.addRound(p.empty()), d = 0; d < s; d += 1) {
								var m = u % 2 != 0 || 0 === h ? C(t, e, s, d, u, h) : null,
									f = h === o - 1 && r,
									g = l.addMatch(m, p.of(f ? a : null));
								if (g.setAlignCb(w(g.el.find(".teamContainer"), g)), f) g.setConnectorCb(p.empty());
								else if (h < o - 1 || u < 1) {
									var b = u % 2 == 0 ? function (t, e) {
										var n = t.height() / 4,
											r = {
												height: 0,
												shift: 2 * n
											};
										return e.winner().order.map(function (t) {
											return t.map(i ? r : {
												height: 0,
												shift: n
											}, i ? r : {
												height: 2 * -n,
												shift: n
											})
										}).orElse(r)
									} : null;
									g.setConnectorCb(p.of(b))
								}
							}
						s /= 2
					}
				}(o, c, B.teams.length, e.skipGrandFinalComeback, e.centerConnectors), e.skipGrandFinalComeback || function (t, e, n, r, i, o) {
					var h = t.addRound(p.empty()),
						c = h.addMatch(function () {
							return [{
								source: function () {
									return e.winner()
								}
							}, {
								source: function () {
									return n.winner()
								}
							}]
						}, p.of(function (i) {
							var a = !1;
							if (r.skipSecondaryFinal || i.winner().name.isEmpty() || i.winner().name !== n.winner().name) {
								if (2 === t.size()) t.dropRound();
								else if (t.size() > 2) throw new Error("Unexpected number of final rounds");
								return s(i)
							}
							if (2 === t.size()) return !1;
							var h = t.addRound(p.of(function () {
								var e = !i.winner().name.isEmpty() && i.winner().name === n.winner().name;
								return !1 === a && e && (a = !0, o()), !e && a && (a = !1, t.dropRound(), o()), e
							})).addMatch(function () {
								return [{
									source: function () {
										return i.first()
									}
								}, {
									source: function () {
										return i.second()
									}
								}]
							}, p.of(s));
							return i.setConnectorCb(p.of(function (t) {
								return {
									height: 0,
									shift: t.height() / 2
								}
							})), h.setConnectorCb(p.empty()), h.setAlignCb(function (t) {
								var r = e.el.height() + n.el.height();
								h.el.css("height", r + "px");
								var i = (e.el.height() / 2 + e.el.height() + n.el.height() / 2) / 2 - t.height();
								t.css("top", i + "px")
							}), !1
						}));
					if (c.setAlignCb(function (t) {
						var i = e.el.height() + n.el.height();
						r.skipConsolationRound || (i /= 2), c.el.css("height", i + "px");
						var o = (e.el.height() / 2 + e.el.height() + n.el.height() / 2) / 2 - t.height();
						t.css("top", o + "px")
					}), !r.skipConsolationRound) {
						var u = n.final().getRound().prev(),
							l = h.addMatch(function () {
								return [{
									source: function () {
										return u.get().match(0).loser()
									}
								}, {
									source: function () {
										return n.loser()
									}
								}]
							}, p.of(a));
						l.setAlignCb(function (t) {
							var r = (e.el.height() + n.el.height()) / 2;
							l.el.css("height", r + "px");
							var i = (e.el.height() / 2 + e.el.height() + n.el.height() / 2) / 2 + t.height() / 2 - r;
							t.css("top", i + "px")
						}), c.setConnectorCb(p.empty()), l.setConnectorCb(p.empty())
					}
					e.final().setConnectorCb(p.of(function (t) {
						var i = t.height() / 4,
							o = (e.el.height() / 2 + e.el.height() + n.el.height() / 2) / 2 - t.height() / 2 - e.el.height() / 2,
							s = e.winner().order.map(function (t) {
								return t.map({
									height: o + i * (r.centerConnectors ? 2 : 1),
									shift: i * (r.centerConnectors ? 2 : 1)
								}, {
									height: o + i * (r.centerConnectors ? 2 : 0),
									shift: i * (r.centerConnectors ? 2 : 3)
								})
							}).orElse({
								height: o + i * (r.centerConnectors ? 2 : 1),
								shift: 2 * i
							}),
							a = s.height,
							h = s.shift;
						return {
							height: a -= t.height() / 2,
							shift: h
						}
					})), n.final().setConnectorCb(p.of(function (t) {
						var i = t.height() / 4,
							o = (e.el.height() / 2 + e.el.height() + n.el.height() / 2) / 2 - t.height() / 2 - e.el.height() / 2,
							s = n.winner().order.map(function (t) {
								return t.map({
									height: o + i * (r.centerConnectors ? 2 : 0),
									shift: i * (r.centerConnectors ? 2 : 3)
								}, {
									height: o + 2 * i,
									shift: i * (r.centerConnectors ? 2 : 1)
								})
							}).orElse({
								height: o + i * (r.centerConnectors ? 2 : 1),
								shift: 2 * i
							}),
							a = s.height,
							h = s.shift;
						return {
							height: -(a += t.height() / 2),
							shift: -h
						}
					}))
				}(u, o, c, e, 0, n)), i(!1), {
					data: function () {
						return h(e.init)
					}
				}
		},
		B = function (t, e) {
			if (t.hasOwnProperty(e)) {
				var n = typeof t[e];
				if ("number" !== n) throw new Error('Option "' + e + '" is ' + n + " instead of number")
			}
		},
		O = function (t, e) {
			var n = "boolean",
				r = typeof t[e];
			if (r !== n) throw new Error("Value of " + e + " must be boolean, got " + n + ", got " + r)
		},
		F = function (t, e, n) {
			var r = e[n];
			if (r < t) throw new Error("Value of " + n + " must be greater than " + t + ", got " + r)
		},
		N = {
			init: function (e) {
				var n = t.extend(!0, {}, e);
				if (!n) throw Error("Options not set");
				if (!n.init && !n.save) throw Error("No bracket data or save callback given");
				if (void 0 === n.userData && (n.userData = null), !(!n.decorator || n.decorator.edit && n.decorator.render)) throw Error("Invalid decorator input");
				n.decorator || (n.decorator = {
					edit: i,
					render: o
				}), n.init || (n.init = {
					teams: [
						[p.empty(), p.empty()]
					],
					results: []
				});
				n.el = this, n.save && (n.onMatchClick || n.onMatchHover) && t.error("Match callbacks may not be passed in edit mode (in conjunction with save callback)");
				var r = typeof n.disableToolbar,
					s = n.hasOwnProperty("disableToolbar");
				s && "boolean" !== r && t.error("disableToolbar must be a boolean, got " + r), !n.save && s && t.error('disableToolbar can be used only if the bracket is editable, i.e. "save" callback given'), s || (n.disableToolbar = void 0 === n.save);
				var a = typeof n.disableTeamEdit,
					h = n.hasOwnProperty("disableTeamEdit");
				h && "boolean" !== a && t.error("disableTeamEdit must be a boolean, got " + a), !n.save && h && t.error('disableTeamEdit can be used only if the bracket is editable, i.e. "save" callback given'), h || (n.disableTeamEdit = !1), !n.disableToolbar && n.disableTeamEdit && t.error('disableTeamEdit requires also resizing to be disabled, initialize with "disableToolbar: true"');
				var c = function t(e, n) {
					return n > 0 && (e = t([e], n - 1)), e
				}(n.init.results, 4 - function t(e, n) {
					return e instanceof Array ? t(e[0], n + 1) : n
				}(n.init.results, 0));
				n.init.results = c.map(function (t) {
					return t.map(function (t) {
						return t.map(function (t) {
							return new m(d.of(T(t[0])), d.of(T(t[1])), t[2])
						})
					})
				}), B(n, "teamWidth"), B(n, "scoreWidth"), B(n, "roundMargin"), B(n, "matchMargin"), n.hasOwnProperty("teamWidth") || (n.teamWidth = 70), n.hasOwnProperty("scoreWidth") || (n.scoreWidth = 30), n.hasOwnProperty("roundMargin") || (n.roundMargin = 40), n.hasOwnProperty("matchMargin") || (n.matchMargin = 20), F(0, n, "teamWidth"), F(0, n, "scoreWidth"), F(0, n, "roundMargin"), F(0, n, "matchMargin"), n.hasOwnProperty("centerConnectors") || (n.centerConnectors = !1), O(n, "centerConnectors"), n.hasOwnProperty("disableHighlight") || (n.disableHighlight = !1), O(n, "disableHighlight");
				var u, l = (u = n.init.teams.length) & u - 1;
				l !== Math.floor(l) && t.error('"teams" property must have 2^n number of team pairs, i.e. 1, 2, 4, etc. Got ' + n.init.teams.length + " team pairs."), n.dir = n.dir || "lr", n.init.teams = n.init.teams && 0 !== n.init.teams.length ? n.init.teams : [
					[null, null]
				], n.init.teams = n.init.teams.map(function (t) {
					return t.map(function (t) {
						return null === t ? p.empty() : p.of(t)
					})
				}), n.skipConsolationRound = n.skipConsolationRound || !1, n.skipSecondaryFinal = n.skipSecondaryFinal || !1, "lr" !== n.dir && "rl" !== n.dir && t.error('Direction must be either: "lr" or "rl"');
				var f = R(n);
				return t(this).data("bracket", {
					target: this,
					obj: f
				}), f
			},
			data: function () {
				return t(this).data("bracket").obj.data()
			}
		};
	t.fn.bracket = function (e) {
		return N[e] ? N[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? void t.error("Method " + e + " does not exist on jQuery.bracket") : N.init.apply(this, arguments)
	}
}(jQuery);